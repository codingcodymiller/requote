import React from 'react';
import BookListItem from './book-list-item';

type VolumeData = {
  imageLinks: {
    thumbnail: string;
  };
  title: string;
  authors: string[];
}

export type GoogleBookData = {
  volumeInfo: VolumeData
  id: string;
  selfLink: string;
}

type ResultsListProps = {
  results: GoogleBookData[]
}

export default function ResultList(props: ResultsListProps) {
  if (!props.results.length) return <></>;

  const results = props.results
    .filter(({ volumeInfo }: GoogleBookData) => volumeInfo.imageLinks)
    .map((book: GoogleBookData) => <BookListItem book={book} key={book.id} />);

  return (
    <div className="row">
      { results }
    </div>
  );
}
