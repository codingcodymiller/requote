import React from 'react';

export default function Header(props) {
  return (
    <header className="container-fluid py-3">
      <div className="row">
        <img className="col-4 col-md-3 col-lg-2" src="/logo.svg" alt="ReQuote logo" />
      </div>
    </header>
  );
}
