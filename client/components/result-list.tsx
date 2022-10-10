import React from 'react';
import BookListItem from './book-list-item';

import { BookData } from '../pages/save-quote'

type VolumeData = {
  imageLinks?: {
    thumbnail: string;
  };
  title: string;
  authors: string[];
}

interface UnsanitizedBookData {
  volumeInfo: VolumeData
  id: string;
  selfLink: string;
}

interface SanitizedBookData extends Omit<UnsanitizedBookData, 'volumeInfo'> {
  volumeInfo: Required<VolumeData>
}

type ResultsListProps = {
  results: UnsanitizedBookData[]
}

export default function ResultList(props: ResultsListProps) {
  if (!props.results.length) return <></>;

  const results = props.results
    .filter(({ volumeInfo }: UnsanitizedBookData) => volumeInfo.imageLinks)
    .map(({ volumeInfo: bookData, id: gBooksId, selfLink: detailsUrl }: SanitizedBookData) => <BookListItem book={{ ...bookData, gBooksId, detailsUrl }} key={gBooksId} />);

  return (
    <div className="row">
      { results }
    </div>
  );
}
