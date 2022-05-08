import React from 'react';
import AppHeader from './components/app-header.jsx';
// import Home from './pages/home';
import BookSearch from './pages/book-search';

export default class App extends React.Component {
  render() {
    return (
      <>
        <AppHeader />
        <main className="bg-lavender-grey rounded-border-top main-content">
          <div className="container">
            <BookSearch />
            {/* <Home /> */}
          </div>
        </main>
      </>
    );
  }
}
