import React, { useState } from 'react';
import SectionHeader from '../components/section-header';
import SearchBar from '../components/search-bar';
import ResultList from '../components/result-list';

export default function BookSearch(props) {
  const [results, updateResults] = useState([]);

  const handleSearchSubmit = event => {
    event.preventDefault();
    fetch(`/api/search/${event.target.elements.search.value}`)
      .then(res => res.json())
      .then(res => updateResults(res.items));
  };

  return (
    <>
      <SectionHeader text="Save Quote" />
      <SearchBar
        label="Book Title"
        placeholder="Ex: The Hobbit"
        handleSubmit={handleSearchSubmit}
      />
      <ResultList results={results} />
    </>
  );
}
