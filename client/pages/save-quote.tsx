import React from 'react';
import { Outlet } from 'react-router-dom';
import SectionHeader from '../components/section-header';

export const SelectedBookContext = React.createContext<BookDataContextValue>({} as BookDataContextValue);

export type BookData = {
  id?: number;
  title: string;
  authors: string[];
  image: string;
  isbn: string;
  description: string;
}

export type BookDataContextValue = {
  data: BookData;
  setBookData: (book: BookData) => void;
}

export default function SaveQuote() {
  const selectedBook = {
    data: {
      title: '',
      image: '',
      authors: [''],
      isbn: '',
      description: ''
    },
    setBookData: function (book: BookData) {
      this.data = book;
    }
  };
  return (
    <SelectedBookContext.Provider value={selectedBook}>
      <SectionHeader text="Save Quote" />
      <Outlet />
    </SelectedBookContext.Provider>
  );
}
