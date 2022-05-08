import React from 'react';
import SectionHeader from '../components/section-header';

export default function BookSearch(props) {

  return (
    <>
      <SectionHeader text="Save Quote" />
      <form>
        <label htmlFor="book-search" className="d-inline-block px-2 my-2">Book Title</label>
        <div className="position-relative col-12">
          <input type="text" id="book-search" className="col-12 p-2 border-1 border-light rounded shadow-sm" placeholder="Ex: The Hobbit" />
          <i className="fa-solid fa-magnifying-glass position-absolute translate-middle-y end-0 top-50 px-3"></i>
        </div>
      </form>
    </>
  );
}
