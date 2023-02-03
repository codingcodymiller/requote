import React, { useEffect, useState } from 'react';
import { BookData } from '../pages/save-quote';
import BookCover from './book-cover';
import LoadingSpinner from './loading-spinner';
import NoBooks from './no-books';

type LibraryListProps = {
  onBookCoverClick?: (book: BookData) => void;
}

export default function LibraryBookList(props: LibraryListProps) {
  const [bookList, updateBookList] = useState([]);
  const [isLoading, setLoadingStatus] = useState(false);

  useEffect(() => {
    let isComponentMounted = true;

    setLoadingStatus(true);
    fetch(`/api/books/`)
      .then(res => res.json())
      .then(res => {
        updateBookList(res);
        setLoadingStatus(false);
      })
      .catch(err => {
        console.error("error:", err)
      })

    return () => { isComponentMounted = false }
  }, [])

  if (isLoading) return <LoadingSpinner />
  if (!bookList.length) return <NoBooks />;

  const results = bookList.map(
    (book: BookData) => <BookCover book={book} key={book.id} callback={props.onBookCoverClick} className="col-6 col-sm-4 col-md-3 col-lg-2 my-2" details rounded />
  );

  return (
    <div className="row">
      {results}
    </div>
  );
}
