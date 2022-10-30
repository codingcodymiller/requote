import React, { useState, FormEvent } from 'react';
import FormControlInput from './form-control-input';
import FormControlLabel from './form-control-label'

interface SearchBarFormControls extends HTMLFormControlsCollection {
  search: HTMLInputElement
}

type SearchBarProps = {
  handleSearchSubmit: (searchTerm: string) => void;
}

export default function SearchBar(props: SearchBarProps) {
  const [searchTerm, updateSearchTerm] = useState('')
  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.handleSearchSubmit(searchTerm)
  };
  return (
    <form onSubmit={handleSearchSubmit}>
      <FormControlLabel
        label="Book Title"
        id="search-bar"
      />
      <div className="position-relative col-12">
        <FormControlInput
          type="text"
          name="search"
          id="search-bar"
          placeholder="Ex: The Hobbit"
          value={searchTerm}
          updateValue={updateSearchTerm}
        />
        <button className="position-absolute translate-middle-y end-0 top-50 mx-3 border-0 bg-transparent">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </form>
  );
}
