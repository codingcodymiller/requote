/* eslint-disable no-console */
require('dotenv/config');

const pg = require('pg');
const path = require('path');
const express = require('express');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./error-middleware');
const { determineSortOrder, determineSortType } = require('./helpers');

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
  const { quoteText, page, isbn, bookTitle, bookAuthors, bookImage } = req.body;
  const selectOrInsertBook = `
    with "book" as (
      insert into "books"
        ("title", "authors", "image", "isbn")
      values
        ($1, $2, $3, $4)
      on conflict ("isbn")
      do nothing
      returning "bookId"
    ),
    "existingBook" as (
      select "bookId" from "books"
      where "isbn" = $4
    )
    insert into "quotes" ("bookId", "page", "quoteText", "quoteVector", "userId")
    select coalesce("existingBook"."bookId", "book"."bookId"), $5, $6, to_tsvector($6), $7
    from "book"
    full join "existingBook" on true
    returning *
  `;
  const params = [bookTitle, bookAuthors, bookImage, isbn, page, quoteText, req.cookies.user_id];
  const result = await db.query(selectOrInsertBook, params);
  const newQuote = result.rows[0];
  res.status(201).json(newQuote);
});

app.get('/api/search/:book', async (req, res) => {
  const url = `https://api2.isbndb.com/books/${req.params.book}`;
  const config = {
    headers: {
      Authorization: process.env.ISBNDB_KEY
    }
  };
  const response = await fetch(url, config);
  const bookData = await response.json();
  res.status(200).json(bookData.books || []);
});

app.get('/api/quotes/:bookId?', async (req, res) => {
  const { sort, order } = req.query;
  const { bookId } = req.params;
  const sortOrder = determineSortOrder(order);
  const sortType = determineSortType(sort);
  const specificBookCondition = bookId ? 'and "b"."bookId" = $2' : '';

  const getQuotes = `
     select "q"."page",
            "q"."quoteText",
            "q"."quoteId",
            "b"."title" as "bookTitle",
            "b"."authors" as "bookAuthors"
       from "quotes" as "q"
       join "books" as "b" using ("bookId")
      where "q"."userId" = $1 ${specificBookCondition}
   order by ${sortType} ${sortOrder}
  `;
  const params = [req.cookies.user_id];
  if (bookId) params.push(bookId);

  const result = await db.query(getQuotes, params);
  const quoteList = result.rows;
  res.status(200).json(quoteList);
});

app.post('/api/quotes/:bookId?', async (req, res) => {
  const { searchTerm } = req.body;
  const { sort, order } = req.query;
  const { bookId } = req.params;
  const sortOrder = determineSortOrder(order);
  const sortType = determineSortType(sort);
  const specificBookCondition = bookId ? 'and "b"."bookId" = $3' : '';

  const getQuotes = `
     select "q"."page",
            "q"."quoteText",
            "q"."quoteId",
            "b"."title" as "bookTitle",
            "b"."authors" as "bookAuthors"
       from "quotes" as "q"
       join "books" as "b" using ("bookId")
      where "q"."userId" = $1 ${specificBookCondition}
        and "q"."quoteVector" @@ to_tsquery($2)
   order by ${sortType} ${sortOrder}
  `;
  const params = [req.cookies.user_id, searchTerm];
  if (bookId) params.push(bookId);

  const result = await db.query(getQuotes, params);
  const quoteList = result.rows;
  res.status(200).json(quoteList);
});

app.get('/api/books', async (req, res) => {
  const getBooks = `
     select "b"."title",
            "b"."image",
            "b"."bookId" as "id"
       from "quotes" as "q"
       join "books" as "b" using ("bookId")
      where "q"."userId" = $1
   order by "b"."title" asc
  `;
  const params = [req.cookies.user_id];
  const result = await db.query(getBooks, params);
  const bookList = result.rows;
  res.status(200).json(bookList);
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

  const { access_token: token, refresh_token: refreshToken, id_token: idTokenRaw } = tokens;
  const decodedId = jwt.decode(idTokenRaw);

  const findExistingUser = `
      select * from "users"
      where "token" = $1
  `;
  const params = [decodedId.sub];
  const result = await db.query(findExistingUser, params);
  let [user] = result.rows;

  if (!user) {
    const createNewUser = `
    insert into "users" ("token")
    values ($1)
    returning *
    `;
    const result = await db.query(createNewUser, params);
    user = result.rows[0];
  }
  res.cookie('access_token', token)
    .cookie('refresh_token', refreshToken)
    .cookie('user_id', user.userId)
    .status(201)
    .redirect('/library');
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
