import React, { useState } from 'react';
import SearchBar from './search-bar';
import ResultList from './result-list';

export default function BookSearch() {
  const [results, updateResults] = useState([]);
  const searchBooks = (searchTerm: string) => {
    fetch(`/api/search/${searchTerm}`)
      .then(res => res.json())
      .then(res => updateResults(res.items));
  }
  return (
    <>
      <SearchBar handleSearchSubmit={searchBooks} />
      <ResultList results={results} />
    </>
  );
}
