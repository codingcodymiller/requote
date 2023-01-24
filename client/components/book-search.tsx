import React, { useState } from 'react';
import DropdownSearchBar, { Option } from './dropdown-search-bar';
import ResultList from './result-list';

export default function BookSearch() {
  const [results, updateResults] = useState([]);
  const [searchTerm, updateSearchTerm] = useState('')
  const searchBooks = (searchTerm: string) => {
    updateSearchTerm(searchTerm)
    fetch(`/api/search/${encodeURIComponent(`"${searchTerm}"`)}`)
      .then(res => res.json())
      .then(res => updateResults(res));
  }
  const options: Option[] = [
    {
      label: "Book",
      value: "book",
      placeholder: "Ex: The Hobbit"
    },
    {
      label: "Author",
      value: "author",
      placeholder: "Ex: Stephen King"
    },
    {
      label: "ISBN",
      value: "isbn",
      placeholder: "Ex: 0375703764 or 978-0375703768"
    },
  ]
  return (
    <>
      <DropdownSearchBar label="Search by Book Title, Author, or ISBN" className="col-12" options={options} handleSearchSubmit={searchBooks} />
      <ResultList results={results} searchTerm={searchTerm} />
    </>
  );
}
