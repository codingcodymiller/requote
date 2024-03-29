import React, { useContext, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom'
import { BookSearchContext, SearchContextValue } from './select-book-for-quote'

type BookDetailsIconProps = {
  isbn: string;
  className?: string;
}

export default function BookDetailsIcon (props: BookDetailsIconProps) {
  const searchContextData: SearchContextValue = useContext(BookSearchContext);
  const navigate = useNavigate();
  const showBookDetails = (event: MouseEvent) => {
    event.stopPropagation();
    if(searchContextData && searchContextData.searchTerm && searchContextData.option){
      sessionStorage.setItem("book-search-term", searchContextData.searchTerm);
      sessionStorage.setItem("book-search-option", searchContextData.option.value)
    }
    navigate(`/book-details/${props.isbn}`)
  }

  return (
    <div className={`icon-circle bg-white d-flex justify-content-center align-items-center ${props.className || ''}`} onClick={showBookDetails} role="button" title="Book Details">
      <i className="fa-regular fa-lg fa-circle-info text-dark-navy"></i>
    </div>
  )
}
