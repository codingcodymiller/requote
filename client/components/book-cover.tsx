import React, { useState } from "react";
import { BookData } from "../pages/save-quote";
import BookDetailsIcon from "./book-details-icon";
import LoadingSpinner from "./loading-spinner";

export type BookCoverProps = {
  book: BookData
  className?: string;
  details?: boolean;
  rounded?: boolean;
  callback?: (book: BookData) => void;
}

export default function BookCover(props: BookCoverProps){
  const { details, className, rounded, callback } = props;
  const { isbn, title, image } = props.book;
  const [isLoading, setLoadState] = useState(true);
  return (
    <div className={`cursor-pointer hover-grow position-relative ${className || ''}`} onClick={callback ? () => callback(props.book) : undefined}>
      {
        details && !isLoading
          ? <BookDetailsIcon isbn={isbn} className="position-absolute top-right-lg fs-5 hover-grow-lg cancel-ancestor-hover-grow" />
          : <></>
      }
      <img src={image} alt={title} onLoad={() => setLoadState(false)} className={`w-100 h-100 book-cover ${rounded ? 'br-10' : ''}  ${isLoading ? 'd-none' : ''}`} />
      {
        isLoading
          ? <div className={`w-100 h-100 pt-3`}>
            <LoadingSpinner />
          </div>
        : <></>
      }
    </div>
  )
}
