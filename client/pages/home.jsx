import React from 'react';
import { Navigate } from 'react-router-dom';

export default function Home(props) {
  return (
    <>
      <a className="btn btn-primary" href="http://localhost:3000/api/login">Login</a>
      <Navigate className="btn btn-primary" to="/library/book-search">Library</Navigate>
    </>
  );
}
