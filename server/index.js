/* eslint-disable no-console */
require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

oauth2Client.on('tokens', tokens => {
  if (tokens.refresh_token) {
    // store the refresh_token in my database!
    console.log('Refresh Token:', tokens.refresh_token);
  }
  console.log('Access Token:', tokens.access_token);
});

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: 'https://www.googleapis.com/auth/books'
});

const app = express();

app.use(staticMiddleware);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

app.get('/login', (req, res) => {
  res.redirect(url);
});

app.get('/auth', async (req, res) => {
  const { code } = req.params;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  console.log(oauth2Client.credentials);
  res.send('Successfully authorized!');
});
