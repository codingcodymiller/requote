import React from "react";
import { Link } from "react-router-dom";

export default function NoQuotes () {
  return (
    <div className="row justify-content-center">
      <div className="col-8 col-md-6 col-lg-4 p-4 mt-3 text-center">
        <h3 className="mb-4">No Quotes...Yet</h3>
        <p className="text-light-grey">Follow <Link to="/save-quote/book-search" className="hyperlink">this link</Link> to save your first quote</p>
        <img className="col-8 m-3" src="/images/no-quotes.svg" alt="person holding empty list" />
      </div>
    </div>
  )
}
