import React from 'react';
import SectionHeader from '../components/section-header';
import LibraryBookList from '../components/library-book-list'
import { useNavigate } from 'react-router-dom';
import { BookData } from './save-quote';

export default function Library() {
  const navigate = useNavigate();
  const showQuotes = (book: BookData) => {
    navigate(`/quotes/${book.id || ''}`, { replace: false });
  }

  return (
    <>
      <SectionHeader text="Library" />
      <LibraryBookList onBookCoverClick={showQuotes} />
    </>
  );
}
