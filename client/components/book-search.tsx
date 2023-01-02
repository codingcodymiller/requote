import React, { useState } from 'react';
import SearchBar from './search-bar';
import ResultList from './result-list';

export default function BookSearch() {
  const [results, updateResults] = useState([]);
  const searchBooks = (searchTerm: string) => {
    fetch(`/api/search/${encodeURIComponent(`"${searchTerm}"`)}`)
      .then(res => res.json())
      .then(res => updateResults(res));
  }
  return (
    <>
      <SearchBar label="Book Title" className="col-12" placeholder="Ex: The Hobbit" handleSearchSubmit={searchBooks} />
      <ResultList results={results} />
    </>
  );
}
