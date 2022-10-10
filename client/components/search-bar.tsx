import React, { FormEvent } from 'react';
import FormControlInput from './form-control-input';
import FormControlLabel from './form-control-label'

interface SearchBarFormControls extends HTMLFormControlsCollection {
  search: HTMLInputElement
}

type SearchBarProps = {
  updateResults: React.Dispatch<React.SetStateAction<never[]>>;
}

export default function SearchBar(props: SearchBarProps) {
  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    const formControls = event.currentTarget.elements as SearchBarFormControls;
    event.preventDefault();
    fetch(`/api/search/${formControls.search.value}`)
      .then(res => res.json())
      .then(res => props.updateResults(res.items));
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
        />
        <button className="position-absolute translate-middle-y end-0 top-50 mx-3 border-0 bg-transparent">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </form>
  );
}
