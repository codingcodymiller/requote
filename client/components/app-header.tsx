import React from 'react';
import { Link } from 'react-router-dom';

export default function AppHeader() {
  return (
    <header className="container-fluid py-3 header-size">
      <div className="row justify-content-between">
        <div className="col-5 col-sm-4 col-md-3 col-lg-2">
          <Link to="/">
            <img className="logo" src="/images/logo.svg" alt="ReQuote logo" />
          </Link>
        </div>
        <nav className="col-6 justify-content-end align-items-center d-none d-md-flex desktop-nav pe-4">
          <Link to="/save-quote/book-search" className="text-dark-navy text-decoration-none px-2">
            <i className="fa-light fa-pen-clip fa-xl m-1 mx-2"></i>
            Save Quote
          </Link>
          <Link to="/library" className="text-dark-navy text-decoration-none px-2">
            <i className="fa-light fa-books fa-xl m-1 mx-2"></i>
            Library
          </Link>
          <Link to="/quotes" className="text-dark-navy text-decoration-none px-2">
            <i className="fa-light fa-book-bookmark fa-xl m-1 mx-2"></i>
            Quotes
          </Link>
        </nav>
        <nav className="col-12 d-flex justify-content-evenly align-items-center d-md-none mobile-nav">
          <Link to="/save-quote/book-search" className="text-center text-dark-navy text-decoration-none">
            <i className="d-block m-3 fa-light fa-pen-clip fa-xl"></i>
            <span className="text-small">Save Quote</span>
          </Link>
          <Link to="/library" className="text-center text-dark-navy text-decoration-none">
            <i className="d-block m-3 fa-light fa-books fa-xl"></i>
            <span className="text-small">Library</span>
          </Link>
          <Link to="/quotes" className="text-center text-dark-navy text-decoration-none">
            <i className="d-block m-3 fa-light fa-book-bookmark fa-xl"></i>
            <span className="text-small">Quotes</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
