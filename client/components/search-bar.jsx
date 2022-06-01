import React, { useState } from 'react';

export default function SearchBar(props) {
  const [value, updateValue] = useState('');

  return (
    <form onSubmit={props.handleSubmit}>
      <label htmlFor="search-bar" className="d-inline-block px-2 my-2">{props.label}</label>
      <div className="position-relative col-12">
        <input
          type="text"
          name="search"
          id="search-bar"
          className="col-12 p-2 border-1 border-light rounded shadow-sm"
          placeholder={props.placeholder}
          value={value}
          onChange={event => updateValue(event.target.value)}
        />
        <button className="position-absolute translate-middle-y end-0 top-50 mx-3 border-0 bg-transparent">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </form>
  );
}
