import React from 'react';
import {
  Routes,
  Route
} from 'react-router-dom';
import Home from './pages/home';
import Library from './pages/library';
import BookSearch from './pages/book-search';
import SaveQuote from './pages/save-quote';

export default function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/library" element={<Library />}>
        <Route path="book-search" element={<BookSearch />} />
        <Route path="save-quote" element={<SaveQuote />} />
      </Route>
    </Routes>
  );
}
