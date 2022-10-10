import React, { useState } from 'react';
import SearchBar from '../components/search-bar';
import ResultList from '../components/result-list';

export default function BookSearch() {
  const [results, updateResults] = useState([]);
  return (
    <>
      <SearchBar updateResults={updateResults} />
      <ResultList results={results} />
    </>
  );
}
