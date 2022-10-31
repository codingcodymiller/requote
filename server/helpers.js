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

module.exports = { determineSortOrder, determineSortType };
