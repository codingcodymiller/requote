import React, { useContext, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom'
import { BookSearchContext, SearchContextValue } from './book-search'

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
    <i className={`fa-solid fa-circle-info text-light-grey ${props.className || ''}`} onClick={showBookDetails}></i>
  )
}
