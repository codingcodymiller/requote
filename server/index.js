/* eslint-disable no-console */
require('dotenv/config');

const pg = require('pg');
const path = require('path');
const express = require('express');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./error-middleware');
const { determineSortOrder, determineSortType, verifyJWT, seekImprovedBookDescription } = require('./helpers');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

const publicPath = path.join(__dirname, 'public');

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
} else {
  app.use(express.static(publicPath));
}

app.use(errorMiddleware);

app.use(cookieParser());

app.use(express.json());

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});

app.post('/api/save', async (req, res) => {
  if (!req.cookies.user_token) {
    return res.status(401).json({ error: 'User not authenticated' });
  }
  const userTokenDecoded = jwt.decode(req.cookies.user_token);
  if (!verifyJWT(userTokenDecoded)) {
    return res.status(401).json({ error: 'User token not valid' });
  }

  const { quoteText, page, isbn, bookTitle, bookAuthors, bookImage, bookDescription } = req.body;
  const publicQuoteId = crypto.randomUUID();
  const publicBookId = crypto.randomUUID();
  const selectOrInsertBook = `
    with "book" as (
      insert into "books"
        ("title", "authors", "image", "description", "isbn", "pubBookId")
      values
        ($1, $2, $3, $4, $5, $6)
      on conflict ("isbn")
      do nothing
      returning "bookId"
    ),
    "existingBook" as (
      select "bookId" from "books"
      where "isbn" = $5
    ),
    "user" as (
      select "userId" from "users"
      where "token" = $9
    )
    insert into "quotes" ("bookId", "page", "quoteText", "quoteVector", "pubQuoteId", "userId")
    select coalesce("existingBook"."bookId", "book"."bookId"), $7, $8, to_tsvector($8), $10, "userId"
    from "book"
    full join "existingBook" on true
    join "user" on true
  `;
  const params = [bookTitle, bookAuthors, bookImage, bookDescription, isbn, publicBookId, page, quoteText, userTokenDecoded.sub, publicQuoteId];
  try {
    await db.query(selectOrInsertBook, params);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
  // code below attempts to get a better description for the book from the Google Books API
  // this can be done after sending a response to the client
  const description = await seekImprovedBookDescription(isbn);
  if (!description) return;

  const updateDescription = `
    update "books" as "b"
       set "description" = $1
     where "b"."isbn" = $2
  `;
  const descriptionParams = [description, isbn];
  try {
    db.query(updateDescription, descriptionParams);
  } catch (err) {
    console.error(err);
  }

});

app.patch('/api/quote/:quoteId', async (req, res) => {
  const userTokenDecoded = jwt.decode(req.cookies.user_token);
  const { page, quoteText } = req.body;
  const { quoteId } = req.params;
  const editQuote = `
    with "user" as (
      select "userId" from "users"
      where "token" = $4
    )
    update "quotes" as "q"
       set "page" = $1,
           "quoteText" = $2,
           "quoteVector" = to_tsvector($2)
      from "user" as "u"
     where "q"."userId" = "u"."userId"
       and "q"."pubQuoteId" = $3
  `;
  const params = [page, quoteText, quoteId, userTokenDecoded.sub];
  try {
    await db.query(editQuote, params);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

app.get('/api/quotes/:bookId?', async (req, res) => {
  if (!req.cookies.user_token) {
    return res.status(200).json([]);
  }
  const userTokenDecoded = jwt.decode(req.cookies.user_token);
  if (!verifyJWT(userTokenDecoded)) {
    return res.status(200).json([]);
  }

  const { sort, order, searchTerm } = req.query;
  const { bookId } = req.params;

  const sortOrder = determineSortOrder(order);
  const sortType = determineSortType(sort);

  const params = [userTokenDecoded.sub];

  if (bookId) params.push(bookId);
  const specificBookCondition = bookId ? 'and "b"."pubBookId" = $' + params.length : '';

  if (searchTerm) params.push(searchTerm);
  const searchTermCondition = searchTerm ? 'and "q"."quoteVector" @@ to_tsquery($' + params.length + ')' : '';

  const getQuotes = `
     with "user" as (
      select "userId" from "users"
      where "token" = $1
     )
     select "q"."page",
            "q"."quoteText",
            "q"."pubQuoteId" as "quoteId",
            "b"."title" as "bookTitle",
            "b"."authors" as "bookAuthors",
            "b"."isbn" as "bookISBN",
            "b"."description" as "bookDescription"
       from "quotes" as "q"
       join "books" as "b" using ("bookId")
       join "user" on true
      where "q"."userId" = "user"."userId"
      ${specificBookCondition} ${searchTermCondition}
   order by ${sortType} ${sortOrder}
  `;

  const result = await db.query(getQuotes, params);
  const quoteList = result.rows;

  res.status(200).json(quoteList);
});

app.get('/api/quote/:quoteId', async (req, res) => {
  const { quoteId } = req.params;

  const getQuote = `
       select "q"."page",
              "q"."quoteText"
         from "quotes" as "q"
        where "q"."pubQuoteId" = $1
  `;
  const param = [quoteId];

  const result = await db.query(getQuote, param);
  const quote = result.rows[0];

  res.status(200).json(quote);
});

app.get('/api/:username/shared-quotes/:bookId?', async (req, res) => {

  const { sort, order, searchTerm } = req.query;
  const { username, bookId } = req.params;

  const sortOrder = determineSortOrder(order);
  const sortType = determineSortType(sort);

  const params = [username];

  if (bookId) params.push(bookId);
  const specificBookCondition = bookId ? 'and "b"."bookId" = $' + params.length : '';

  if (searchTerm) params.push(searchTerm);
  const searchTermCondition = searchTerm ? 'and "q"."quoteVector" @@ to_tsquery($' + params.length + ')' : '';

  const getQuotes = `
     with "user" as (
      select "u"."userId"
      from "users" as "u"
      where "username" = $1
     )
     select "q"."page",
            "q"."quoteText",
            "q"."pubQuoteId",
            "b"."title" as "bookTitle",
            "b"."authors" as "bookAuthors",
            "b"."isbn" as "bookISBN",
            "b"."description" as "bookDescription"
       from "quotes" as "q"
       join "books" as "b" using ("bookId")
       join "user" on true
      where "q"."userId" = "user"."userId"
      ${specificBookCondition} ${searchTermCondition}
   order by ${sortType} ${sortOrder}
  `;

  const result = await db.query(getQuotes, params);
  const quoteList = result.rows;

  res.status(200).json(quoteList);
});

app.get('/api/search/:book', async (req, res) => {
  const url = `https://api2.isbndb.com/books/${req.params.book}?column=${req.query.type}`;
  const config = {
    headers: {
      Authorization: process.env.ISBNDB_KEY
    }
  };
  try {
    const response = await fetch(url, config);
    const bookData = await response.json();
    bookData.books = bookData.books ? bookData.books.filter(book => book.authors && (book.description = book.synopsis)) : [];
    res.status(200).json(bookData.books);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

app.get('/api/books', async (req, res) => {
  if (!req.cookies.user_token) {
    return res.status(200).json([]);
  }
  const userTokenDecoded = jwt.decode(req.cookies.user_token);
  if (!verifyJWT(userTokenDecoded)) {
    return res.status(200).json([]);
  }

  const getBooks = `
     with "user" as (
      select "userId" from "users"
      where "token" = $1
     )
     select distinct "b"."isbn",
            "b"."title",
            "b"."image",
            "b"."pubBookId" as "id",
            "b"."description"
       from "books" as "b"
       join "quotes" as "q" using ("bookId")
       join "user" on true
      where "q"."userId" = "user"."userId"
   order by "b"."title" asc
  `;
  const params = [userTokenDecoded.sub];
  const result = await db.query(getBooks, params);
  const bookList = result.rows;
  res.status(200).json(bookList);
});

app.get('/api/book/:isbn', async (req, res) => {
  const { isbn } = req.params;
  const getBook = `
     select "b"."title",
            "b"."image",
            "b"."pubBookId" as "id",
            "b"."isbn",
            "b"."authors",
            "b"."description"
       from "books" as "b"
      where "b"."isbn" = $1
  `;
  const params = [isbn];
  const result = await db.query(getBook, params);
  let bookDetails = null;
  if (result.rows.length) {
    bookDetails = result.rows[0];
  } else {
    const url = `https://api2.isbndb.com/book/${isbn}`;
    const config = {
      headers: {
        Authorization: process.env.ISBNDB_KEY
      }
    };
    try {
      const response = await fetch(url, config);
      const responseData = response.json();
      bookDetails = responseData.book;
      bookDetails.description = bookDetails.synopsis;
    } catch (err) {
      console.error(err);
    }
  }
  res.status(200).json(bookDetails);
});

app.get('/api/login', (req, res) => {
  const queryParams = [
    'response_type=code',
    'access_type=offline',
    `client_id=${process.env.GOOGLE_CLIENT_ID}`,
    `redirect_uri=${process.env.GOOGLE_REDIRECT_URL}`,
    `scope=${encodeURIComponent('openid email profile')}`
  ];
  const url = 'https://accounts.google.com/o/oauth2/v2/auth?' + queryParams.join('&');
  res.redirect(url);
});

app.get('/api/auth', async (req, res) => {
  const { code } = req.query;
  const body = JSON.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT_URL,
    grant_type: 'authorization_code',
    code
  });
  const response = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', body });
  const tokens = await response.json();

  // eslint-disable-next-line camelcase
  const { access_token, id_token } = tokens;
  const decodedId = jwt.decode(id_token);
  const username = decodedId.email.split('@')[0];

  const createNewUser = `
    insert into "users" ("token", "username")
    values ($1, $2)
    on conflict ("token")
    do nothing
  `;
  const params = [decodedId.sub, username];
  db.query(createNewUser, params);

  res.cookie('access_token', access_token)
    .cookie('username', username)
    .cookie('user_token', id_token, {
      httpOnly: true,
      sameSite: 'lax'
    })
    .status(201)
    .redirect('/save-quote/form');
});

app.get('/api/*', function (req, res) {
  res.status(404).json({ message: 'API Endpoint does not exist' });
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
