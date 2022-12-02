import React from 'react';
import BookCover, { BookData } from './book-cover';
import NoBooks from './no-books';

type LibraryListProps = {
  results: BookData[]
}

export default function LibraryBookList(props: LibraryListProps) {
  if (!props.results.length) return <NoBooks />;

  const results = props.results
    .map((book: BookData) => <BookCover title={book.title} image={book.image} id={book.id} isbn={book.isbn} key={book.id} />);

  return (
    <div className="row">
      {results}
    </div>
  );
}
