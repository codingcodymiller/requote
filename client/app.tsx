import React from 'react';
import {
  Routes,
  Route
} from 'react-router-dom';
import AppHeader from './components/app-header';
import Home from './pages/home';
import Library from './pages/library';
import BookSearch from './components/book-search';
import SaveQuote from './pages/save-quote';
import SaveQuoteForm from './components/save-quote-form';
import QuoteDashboard from './pages/quote-dashboard'
import BookDetails from './pages/book-details';
import PrivacyPolicy from './pages/privacy-policy';
import './styles/styles.scss'

export default function App() {
  return (
    <>
      <AppHeader />
      <main className="bg-lavender-grey rounded-border-top main-content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/save-quote" element={<SaveQuote />}>
              <Route path="book-search" element={<BookSearch />} />
              <Route path="form" element={<SaveQuoteForm />} />
            </Route>
            <Route path="/:username/quotes" element={<QuoteDashboard />} />
            <Route path="/quotes" element={<QuoteDashboard />} />
            <Route path="/quotes/:bookId" element={<QuoteDashboard />}/>
            <Route path="/book-details/:isbn" element={<BookDetails />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </div>
      </main>
    </>
  );
}
