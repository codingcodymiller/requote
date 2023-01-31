import React, { Dispatch, SetStateAction, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppHeader from './components/app-header';
import Home from './pages/home';
import Library from './pages/library';
import BookSearch from './components/book-search';
import SaveQuote from './pages/save-quote';
import SaveQuoteForm from './components/save-quote-form';
import EditQuote from './pages/edit-quote'
import QuoteDashboard from './pages/quote-dashboard'
import BookDetails from './pages/book-details';
import AccountSettings from './pages/account-settings';
import PrivacyPolicy from './pages/privacy-policy';
import { getCookie } from './helpers';
import './styles/styles.scss'

export const UserContext = React.createContext<UserContextValue>({} as UserContextValue);

export type UserContextValue = {
  username: string;
  updateUsername: Dispatch<SetStateAction<string>>;
}

export default function App() {
  const [username, updateUsername] = useState(getCookie('username') || '')
  const contextValue = { username, updateUsername }
  return (
    <UserContext.Provider value={ contextValue }>
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
            <Route path="/edit-quote/:quoteId" element={<EditQuote />} />
            <Route path="/:username/quotes" element={<QuoteDashboard />} />
            <Route path="/quotes" element={<QuoteDashboard />} />
            <Route path="/quotes/:bookId" element={<QuoteDashboard />} />
            <Route path="/book-details/:isbn" element={<BookDetails />} />
            <Route path="/account-settings" element={<AccountSettings />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </div>
      </main>
    </UserContext.Provider>
  );
}
