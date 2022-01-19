require('dotenv/config');
const express = require('express');
const jwt = require('jsonwebtoken');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const app = express();

app.use(staticMiddleware);

app.use(errorMiddleware);

app.use(express.urlencoded({
  extended: true
}));

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

app.post('/auth', (req, res) => {
  const token = jwt.decode(req.body.credential);

  // eslint-disable-next-line no-console
  console.log(token);
});
