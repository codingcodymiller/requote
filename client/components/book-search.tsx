import React, { useState } from 'react';
import DropdownSearchBar, { Option, OptionStore } from './dropdown-search-bar';
import ResultList from './result-list';

export const BookSearchContext = React.createContext<SearchContextValue>({} as SearchContextValue);

export type SearchContextValue = {
  searchTerm: string;
  option: Option;
}

export default function BookSearch() {
  const options: OptionStore = {
    title: {
      label: "Book",
      value: "title",
      placeholder: "Ex: The Hobbit"
    },
    author: {
      label: "Author",
      value: "author",
      placeholder: "Ex: Stephen King"
    }
  }
  const [results, updateResults] = useState([]);
  const sessionSearchTerm = sessionStorage.getItem("book-search-term");
  const sessionSearchOption = sessionStorage.getItem("book-search-option")
  const [searchTerm, updateSearchTerm] = useState(sessionSearchTerm || "")
  const [selectedOption, setSelectedOption] = useState(options[sessionSearchOption || "title"])
  const searchBooks = (searchTerm: string, option: string) => {
    fetch(`/api/search/${encodeURIComponent(`"${searchTerm}"`)}?type=${option}`)
      .then(res => {
        debugger;
        return res.json()
      })
      .then(res => {
        debugger;
        updateResults(res)
      });
  }
  if (sessionSearchTerm && sessionSearchOption){
    searchBooks(sessionSearchTerm, sessionSearchOption)
    sessionStorage.removeItem("book-search-term")
    sessionStorage.removeItem("book-search-option")
  }
  const contextValue = {
    searchTerm: searchTerm,
    option: selectedOption
  }
  return (
    <BookSearchContext.Provider value={contextValue}>
      <DropdownSearchBar
        label="Search by Book Title or Author"
        className="col-12"
        options={options}
        searchTerm={searchTerm}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        updateSearchTerm={updateSearchTerm}
        handleSearchSubmit={searchBooks} />
      <ResultList results={results} searchTerm={searchTerm} />
    </BookSearchContext.Provider>
  );
}
