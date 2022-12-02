import React from "react";
import { Link } from "react-router-dom";

export default function NoBooks() {
  return (
    <div className="row justify-content-center">
      <div className="col-8 col-md-6 col-lg-4 p-4 mt-3 text-center">
        <h3 className="mb-4">No Books In Library</h3>
        <p className="text-light-grey">Follow <Link to="/save-quote/book-search" className="hyperlink">this link</Link> to start building your quote library</p>
        <img className="col-8 m-3" src="/images/no-books.svg" alt="person standing next to bookcase" />
      </div>
    </div>
  )
}
