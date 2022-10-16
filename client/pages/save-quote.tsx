import React from 'react';
import { Outlet } from 'react-router-dom';
import SectionHeader from '../components/section-header';
import AppHeader from '../components/app-header';

export const SelectedBookContext = React.createContext<BookDataContextValue>({} as BookDataContextValue);

export type BookData = {
  title: string;
  authors: string[];
  detailsUrl: string;
  gBooksId: string;
  imageLinks: {
    thumbnail: string;
  }
}

export type BookDataContextValue = {
  data: BookData;
  setBookData: (book: BookData) => void;
}

export default function SaveQuote() {
  const selectedBook = {
    data: {
      title: '',
      imageLinks: {
        thumbnail: ''
      },
      authors: [''],
      detailsUrl: '',
      gBooksId: ''
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
