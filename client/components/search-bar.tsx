import React, { useState, FormEvent } from 'react';
import FormControlInput from './form-control-input';
import FormControlLabel from './form-control-label'

interface SearchBarFormControls extends HTMLFormControlsCollection {
  search: HTMLInputElement
}

type SearchBarProps = {
  label?: string;
  placeholder: string;
  handleSearchSubmit: (searchTerm: string) => void;
}

export default function SearchBar(props: SearchBarProps) {
  const { placeholder, label } = props;
  const [searchTerm, updateSearchTerm] = useState('')
  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.handleSearchSubmit(searchTerm)
  };
  return (
    <form onSubmit={handleSearchSubmit}>
      {
        label ?
        <FormControlLabel
          label={label}
          id="search-bar"
        /> :
        ""
      }
      <div className="position-relative col-12">
        <FormControlInput
          type="text"
          name="search"
          id="search-bar"
          placeholder={placeholder}
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
