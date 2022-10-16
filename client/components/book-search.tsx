import React, { useState } from 'react';
import SearchBar from './search-bar';
import ResultList from './result-list';

export default function BookSearch() {
  const [results, updateResults] = useState([]);
  return (
    <>
      <SearchBar updateResults={updateResults} />
      <ResultList results={results} />
    </>
  );
}
