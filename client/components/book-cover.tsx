import React from "react";
import { useNavigate } from 'react-router-dom';


export type BookData = {
  id: number;
  imageUrl: string;
  title: string;
}

export default function BookCover(props: BookData){
  const navigate = useNavigate();
  const showQuotes = () => {
    navigate(`/quotes/${props.id}`, { replace: false });
  }
  return (
    <div className="col-6 col-sm-3 my-2 cursor-pointer hover-grow" onClick={showQuotes}>
      <img src={props.imageUrl} alt={props.title} className="w-100 h-100 book-cover" />
    </div>
  )
}
