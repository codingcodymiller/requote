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
  const { book, details, className, rounded, callback } = props;
  const { isbn, title, image } = book;
  const [imagePath, updateImagePath] = useState(image)
  const [isLoading, setLoadState] = useState(true);
  return (
    <div role="button" title={`${title} Cover`} className={`cursor-pointer hover-grow position-relative ${className || ''}`} onClick={callback ? () => callback(props.book) : undefined}>
      {
        details && !isLoading
          ? <BookDetailsIcon isbn={isbn} className="position-absolute top-right-lg fs-5 hover-grow-lg cancel-ancestor-hover-grow" />
          : <></>
      }
      <img src={imagePath} alt={title} onLoad={() => setLoadState(false)} onError={() => updateImagePath('/images/placeholder-image.jpg')} className={`w-100 h-100 book-cover ${rounded ? 'br-10' : ''}  ${isLoading ? 'd-none' : ''}`} />
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
