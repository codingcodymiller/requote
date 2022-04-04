import React from 'react';
import Header from './components/header.jsx';
// import Home from './pages/home';
import SaveQuote from './pages/save-quote';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <main className="bg-lavender-grey rounded-border-top main-content">
          <div className="container">
            <SaveQuote />
          </div>
        </main>
      </>
    );
  }
}
