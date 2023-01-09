import React from "react";
import { useNavigate } from 'react-router-dom';
import BookDetailsIcon from "./book-details-icon";

export type BookData = {
  id?: number;
  image: string;
  title: string;
  isbn?: string;
  className?: string;
  details?: boolean;
  rounded?: boolean;
}

export default function BookCover(props: BookData){
  const navigate = useNavigate();
  const showQuotes = () => {
    navigate(`/quotes/${props.id || ''}`, { replace: false });
  }
  return (
    <div className={`cursor-pointer hover-grow position-relative ${props.className || ''}`} onClick={showQuotes}>
      {
        props.details
          ? <BookDetailsIcon isbn={props.isbn || ''} className="position-absolute top-right-lg" />
          : <></>
      }
      <img src={props.image} alt={props.title} className={`w-100 h-100 book-cover ${props.rounded ? 'br-10' : ''}`} />
    </div>
  )
}
