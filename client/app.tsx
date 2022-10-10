import React from 'react';
import {
  Routes,
  Route
} from 'react-router-dom';
import Home from './pages/home';
import Library from './pages/library';
import BookSearch from './pages/book-search';
import SaveQuote from './pages/save-quote';
import SaveQuoteForm from './components/save-quote-form';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/library" element={<Library />} />
      <Route path="/save-quote" element={<SaveQuote />}>
        <Route path="book-search" element={<BookSearch />} />
        <Route path="form" element={<SaveQuoteForm />} />
      </Route>
    </Routes>
  );
}
