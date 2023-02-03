import React, { useContext, useState } from 'react';
import DropdownSearchBar, { Option, OptionStore } from './dropdown-search-bar';
import LoadingSpinner from './loading-spinner';
import ResultList from './result-list';
import LibraryBookList from './library-book-list';
import { BookData, BookDataContextValue, SelectedBookContext } from '../pages/save-quote';
import { useNavigate } from 'react-router-dom';

export const BookSearchContext = React.createContext<SearchContextValue>({} as SearchContextValue);

export type SearchContextValue = {
  searchTerm: string;
  option: Option;
}

export default function SelectBookForQuote() {
  const navigate = useNavigate();

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
  const selectedBookData: BookDataContextValue = useContext(SelectedBookContext);
  const [results, updateResults] = useState([]);
  const [isLoading, setLoadingStatus] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const sessionSearchTerm = sessionStorage.getItem("book-search-term");
  const sessionSearchOption = sessionStorage.getItem("book-search-option")
  const [searchTerm, updateSearchTerm] = useState(sessionSearchTerm || "")
  const [selectedOption, setSelectedOption] = useState(options[sessionSearchOption || "title"])

  const searchBooks = (searchTerm: string, option: string) => {
    setLoadingStatus(true);
    fetch(`/api/search/${encodeURIComponent(`"${searchTerm}"`)}?type=${option}`)
      .then(res => res.json())
      .then(res => {
        updateResults(res);
        setLoadingStatus(false);
        setFormSubmitted(true);
      });
  }

  const selectBookFromLibrary = (book: BookData) => {
    selectedBookData.setBookData(book);
    navigate('/save-quote/form', { replace: false });
  }
  if (sessionSearchTerm && sessionSearchOption) {
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
        handleSearchSubmit={searchBooks}
        setFormSubmitted={setFormSubmitted}
      />
      {
        isLoading
          ? <LoadingSpinner />
          : <ResultList results={results} searchTerm={searchTerm} formSubmitted={formSubmitted} />
      }
      <div className="d-flex justify-content-center">
        <h5 className="text-uppercase my-3 px-3 py-1 divider-header text-center">Or select a book from your library:</h5>
      </div>
      <LibraryBookList onBookCoverClick={selectBookFromLibrary} />
    </BookSearchContext.Provider>
  );
}
