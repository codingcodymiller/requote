import React, { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom'

type BookDetailsIconProps = {
  isbn: string;
  className?: string;
}

export default function BookDetailsIcon (props: BookDetailsIconProps) {
  const navigate = useNavigate();
  const showBookDetails = (event: MouseEvent) => {
    event.stopPropagation();
    navigate(`/book-details/${props.isbn}`)
  }

  return (
    <i className={`fa-solid fa-circle-info text-light-grey ${props.className || ''}`} onClick={showBookDetails}></i>
  )
}
