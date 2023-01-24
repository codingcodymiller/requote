import React, { useState } from 'react';
import DropdownSearchBar, { Option } from './dropdown-search-bar';
import ResultList from './result-list';

export default function BookSearch() {
  const [results, updateResults] = useState([]);
  const [searchTerm, updateSearchTerm] = useState('')
  const searchBooks = (searchTerm: string, option: string) => {
    updateSearchTerm(searchTerm)
    fetch(`/api/search/${encodeURIComponent(`"${searchTerm}"`)}?type=${option}`)
      .then(res => res.json())
      .then(res => updateResults(res));
  }
  const options: Option[] = [
    {
      label: "Book",
      value: "title",
      placeholder: "Ex: The Hobbit"
    },
    {
      label: "Author",
      value: "author",
      placeholder: "Ex: Stephen King"
    }
  ]
  return (
    <>
      <DropdownSearchBar label="Search by Book Title or Author" className="col-12" options={options} handleSearchSubmit={searchBooks} />
      <ResultList results={results} searchTerm={searchTerm} />
    </>
  );
}
