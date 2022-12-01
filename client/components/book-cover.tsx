import React from "react";
import { useNavigate } from 'react-router-dom';
import BookDetailsIcon from "./book-details-icon";

export type BookData = {
  id: number;
  image: string;
  title: string;
  isbn: string;
}

export default function BookCover(props: BookData){
  const navigate = useNavigate();
  const showQuotes = () => {
    navigate(`/quotes/${props.id}`, { replace: false });
  }
  return (
    <div className="col-6 col-sm-3 my-2 cursor-pointer hover-grow position-relative" onClick={showQuotes}>
      <BookDetailsIcon isbn={props.isbn} className="position-absolute top-right-lg" />
      <img src={props.image} alt={props.title} className="w-100 h-100 book-cover" />
    </div>
  )
}
