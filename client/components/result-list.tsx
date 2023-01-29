import React from 'react';
import BookListItem from './book-list-item';
import { BookData } from '../pages/save-quote'
import NoResults from './no-results';

type ResultsListProps = {
  results: BookData[];
  searchTerm: string;
}

export default function ResultList(props: ResultsListProps) {
  if (!props.results.length && props.searchTerm) return <NoResults />;
  const results = props.results
    .map((book: BookData) => <BookListItem book={book} key={book.isbn} />);

  return (
    <div className="row">
      { results }
    </div>
  );
}
