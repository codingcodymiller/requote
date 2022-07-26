import React from 'react';
import FormInput from '../components/form-input';

export default function SearchBar(props) {
  const handleSearchSubmit = event => {
    event.preventDefault();
    fetch(`/api/search/${event.target.elements.search.value}`)
      .then(res => res.json())
      .then(res => props.updateResults(res.items));
  };
  return (
    <form onSubmit={handleSearchSubmit}>
        <FormInput
          label="Book Title"
          type="text"
          name="search"
          id="search-bar"
          placeholder="Ex: The Hobbit"
        >
          <button className="position-absolute translate-middle-y end-0 top-50 mx-3 border-0 bg-transparent">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </FormInput>
    </form>
  );
}
