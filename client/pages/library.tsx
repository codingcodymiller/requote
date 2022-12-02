import React, { useEffect, useState } from 'react';
import SectionHeader from '../components/section-header';
import LibraryBookList from '../components/library-book-list'
import NoBooks from '../components/no-books';

export default function Library() {
  const [bookList, updateBookList] = useState([]);

  useEffect(() => {
    let isComponentMounted = true;

    fetch(`/api/books/`)
      .then(res => res.json())
      .then(res => updateBookList(res));

    return () => { isComponentMounted = false }
  })

  return (
    <>
      <SectionHeader text="Library" />
      <LibraryBookList results={bookList} />
    </>
  );
}
