import React from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from '../components/app-header.jsx';

export const SelectedBookContext = React.createContext();

export default function Library() {
  const selectedBookData = {
    bookData: {
      title: null,
      imageLinks: {},
      authors: [],
      detailsUrl: '',
      bookId: ''
    },
    setBookData: function (bookData) {
      this.bookData = bookData;
    }
  };
  return (
    <SelectedBookContext.Provider value={selectedBookData}>
      <AppHeader />
      <main className="bg-lavender-grey rounded-border-top main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </SelectedBookContext.Provider>
  );
}
