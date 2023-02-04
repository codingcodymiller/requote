const fetch = require('node-fetch');

function determineSortOrder(requestedOrder) {
  switch (requestedOrder) {
    case 'ascending':
      return 'asc';
    case 'descending':
    default:
      return 'desc';
  }
}

function determineSortType(requestedType) {
  switch (requestedType) {
    case 'quote':
      return 'length("q"."quoteText")';
    case 'page':
      return '"q"."page"';
    case 'date':
    default:
      return '"q"."created"';
  }
}

function verifyJWT(jwt) {
  if (!jwt) return false;
  if (
    (jwt.iss !== 'https://accounts.google.com' && jwt.iss !== 'accounts.google.com') ||
    jwt.aud !== process.env.GOOGLE_CLIENT_ID ||
    jwt.exp * 1000 <= Date.now()
  ) {
    return false;
  }
  return true;
}

async function getGoogleBooksIdByISBN(isbn) {
  const response = await fetch('https://www.googleapis.com/books/v1/volumes/?q=isbn:' + isbn);
  const bookResults = await response.json();
  return bookResults?.items?.[0]?.id;
}

async function seekImprovedBookDescription(bookISBN) {
  const gBooksId = await getGoogleBooksIdByISBN(bookISBN);
  if (!gBooksId) return;

  const response = await fetch('https://www.googleapis.com/books/v1/volumes/' + gBooksId);
  const bookData = await response.json();
  return bookData.volumeInfo.description;
}

async function urlExists(url) {
  const response = await fetch(url);
  return response.status !== 404;
}

module.exports = { determineSortOrder, determineSortType, verifyJWT, seekImprovedBookDescription, urlExists };
