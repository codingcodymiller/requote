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
  return await fetch('https://www.googleapis.com/books/v1/volumes/?q=isbn:' + isbn).then(res => res.json()).then(res => res.items[0]?.id);
}

module.exports = { determineSortOrder, determineSortType, verifyJWT, getGoogleBooksIdByISBN };
