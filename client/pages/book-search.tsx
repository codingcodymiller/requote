import React, { useState } from 'react';
import SectionHeader from '../components/section-header';
import SearchBar from '../components/search-bar';
import ResultList from '../components/result-list';

export default function BookSearch() {
  const [results, updateResults] = useState([]);

  return (
    <>
      <SectionHeader text="Save Quote" />
      <SearchBar updateResults={updateResults} />
      <ResultList results={results} />
    </>
  );
}
