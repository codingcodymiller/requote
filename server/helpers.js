function determineSortOrder(requestedType) {
  switch (requestedType) {
    case 'ascending':
      return 'asc';
    case 'descending':
    default:
      return 'desc';
  }
}

module.exports = { determineSortOrder };
