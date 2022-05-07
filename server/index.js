/* eslint-disable no-console */
require('dotenv/config');
const pg = require('pg');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const { google } = require('googleapis');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);

app.use(errorMiddleware);

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

app.get('/api/login', (req, res) => {
  const urlSegments = [
    'response_type=code',
    'access_type=offline',
    `client_id=${process.env.GOOGLE_CLIENT_ID}`,
    `redirect_uri=${process.env.GOOGLE_REDIRECT_URL}`,
    `scope=${encodeURIComponent('openid email profile')}`
  ];
  const url = 'https://accounts.google.com/o/oauth2/v2/auth?' + urlSegments.join('&');
  res.redirect(url);
});

app.get('/api/search/:book', (req, res) => {
  console.log('Testing!!!');
});

app.get('/api/auth', async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  console.log('Credentials:', oauth2Client.credentials);
  const { access_token: token, refresh_token: refreshToken } = oauth2Client.credentials;
  const sql = `
    insert into "users" ("token", "refreshToken")
    values ($1, $2)
    returning *
  `;
  const params = [token, refreshToken];
  try {
    const result = await db.query(sql, params);
    const [user] = result.rows;
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
      stack: err.stack
    });
  }
});
