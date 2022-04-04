import React from 'react';

export default function Header(props) {
  return (
    <header className="container-fluid py-3">
      <div className="row justify-content-between">
        <img className="col-5 col-sm-4 col-md-3 col-lg-2" src="/logo.svg" alt="ReQuote logo" />
        <nav className="col-6 justify-content-end align-items-center d-none d-md-flex desktop-nav">
          <a href="" className="text-dark-navy">
            <i className="fa-solid fa-pen-clip fa-xl m-1"></i>
            Save Quote
          </a>
        </nav>
        <nav className="col-12 d-flex justify-content-center align-items-center d-md-none mobile-nav">
          <a href="" className="text-center text-dark-navy">
            <i className="d-block m-3 fa-solid fa-pen-clip fa-xl"></i>
            <span className="text-small">Save Quote</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
