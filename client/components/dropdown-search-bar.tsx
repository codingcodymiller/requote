import React, { useState, FormEvent, Dispatch, SetStateAction } from 'react';
import FormControlInput from './form-control-input';
import FormControlLabel from './form-control-label';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export type Option = {
  label: string;
  value: string;
  placeholder?: string;
}

export type OptionStore = {
  [key: string]: Option;
}

type DropdownSearchBarProps = {
  label?: string;
  className?: string;
  options: OptionStore;
  selectedOption: Option;
  searchTerm: string;
  setSelectedOption: Dispatch<SetStateAction<Option>>;
  updateSearchTerm: Dispatch<SetStateAction<string>>;
  handleSearchSubmit: (searchTerm: string, option: string) => void;
}

export default function DropdownSearchBar(props: DropdownSearchBarProps) {
  const { label, className, options, selectedOption, setSelectedOption, searchTerm, updateSearchTerm } = props;

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.handleSearchSubmit(searchTerm, selectedOption.value)
  };
  let optionsList = Object.values(options).map(option => <Dropdown.Item key={option.label} onClick={() => setSelectedOption(option)} href="#">{option.label}</Dropdown.Item>)

  return (
    <form onSubmit={handleSearchSubmit} className={`${className || ''}`}>
      {
        label ?
          <FormControlLabel
            label={label}
            id="search-bar"
          /> :
          ""
      }
      <div className="input-group position-relative col-12 border-light shadow-sm">
        <DropdownButton id="option-target" bsPrefix="btn btn-outline-secondary text-muted bg-white rounded-0 rounded-start h-100 px-3" title={selectedOption.label}>
          {optionsList}
        </DropdownButton>
        <FormControlInput
          type="text"
          name="search"
          id="search-bar"
          className="form-control rounded-end"
          placeholder={selectedOption.placeholder || ''}
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
