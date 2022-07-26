import React from 'react';
import BookListItem from './book-list-item';

export default function ResultList(props) {
  if (!props.results.length) return <></>;

  const results = props.results
    .filter(({ volumeInfo }) => Boolean(volumeInfo.imageLinks))
    .map(({ volumeInfo: bookData, id: gBooksId, selfLink: detailsUrl }) => <BookListItem book={{ ...bookData, gBooksId, detailsUrl }} key={gBooksId} />);

  return (
    <div className="row">
      { results }
    </div>
  );
}
