import React from 'react';

export default function AppHeader() {
  return (
    <header className="container-fluid py-3 header-size">
      <div className="row justify-content-between">
        <div className="col-5 col-sm-4 col-md-3 col-lg-2">
          <img className="logo" src="/logo.svg" alt="ReQuote logo" />
        </div>
        <nav className="col-6 justify-content-end align-items-center d-none d-md-flex desktop-nav pe-4">
          <a href="" className="text-dark-navy text-decoration-none">
            <i className="fa-solid fa-pen-clip fa-xl m-1 mx-2"></i>
            Save Quote
          </a>
        </nav>
        <nav className="col-12 d-flex justify-content-center align-items-center d-md-none mobile-nav">
          <a href="" className="text-center text-dark-navy text-decoration-none">
            <i className="d-block m-3 fa-solid fa-pen-clip fa-xl"></i>
            <span className="text-small">Save Quote</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
