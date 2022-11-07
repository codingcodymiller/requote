import React from 'react';
import BookCover, { BookData } from './book-cover';

type LibraryListProps = {
  results: BookData[]
}

export default function LibraryBookList(props: LibraryListProps) {
  if (!props.results.length) return <></>;

  const results = props.results
    .map((book: BookData) => <BookCover title={book.title} imageUrl={book.imageUrl} id={book.id} key={book.id} />);

  return (
    <div className="row">
      {results}
    </div>
  );
}
