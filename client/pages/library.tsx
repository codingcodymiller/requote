import React, { useEffect, useState } from 'react';
import SectionHeader from '../components/section-header';
import LibraryBookList from '../components/library-book-list'
import LoadingSpinner from '../components/loading-spinner';

export default function Library() {
  const [bookList, updateBookList] = useState([]);
  const [isLoading, setLoadingStatus] = useState(true);

  useEffect(() => {
    let isComponentMounted = true;

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

  return (
    <>
      <SectionHeader text="Library" />
      {
        isLoading
        ? <LoadingSpinner />
        : <LibraryBookList results={bookList} />
      }
    </>
  );
}
