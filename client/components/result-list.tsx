import React from 'react';
import BookListItem from './book-list-item';
import { BookData } from '../pages/save-quote'

type ResultsListProps = {
  results: BookData[]
}

export default function ResultList(props: ResultsListProps) {
  if (!props.results.length) return <></>;

  const results = props.results.map((book: BookData) => <BookListItem book={book} key={book.isbn} />);

  return (
    <div className="row">
      { results }
    </div>
  );
}
