/* eslint-disable no-console */
require('dotenv/config');
const pg = require('pg');
const path = require('path');
const express = require('express');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./error-middleware');

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

app.get('/api/search/:book', async (req, res) => {
  const queryParams = [
    'orderBy=relevance',
    'printType=books',
    'projection=lite',
    'maxResults=40',
    `q=${req.params.book}`
  ];
  const url = 'https://www.googleapis.com/books/v1/volumes?' + queryParams.join('&');
  const response = await fetch(url);
  const bookData = await response.json();
  res.status(200).json(bookData);
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
    .cookie('user_id', user.id)
    .status(201)
    .redirect('/library/book-search');
});

app.post('/api/save', async (req, res) => {
  // const { quoteText, page, gBooksId } = req.body;
  // const createNewQuote = `
  //   insert into "quotes" ("quoteText", "page", "gBooksId", "userId")
  //   values ($1)
  //   returning *
  //   `;
  // const params = [quoteText, page, gBooksId, req.cookies.user_id];
  // const result = await db.query(createNewQuote, params);
  // const newQuote = result.rows[0];
});
