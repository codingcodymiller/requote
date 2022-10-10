import React, { useState } from 'react';

export default function FormControlInput(props) {
  const [value, updateValue] = useState('');
  const { children, optional, ...config } = props;
  return (
    <>
      <label htmlFor={props.id} className="d-inline-block px-2 my-2">
        {props.label}
        {optional ? <span className="text-secondary fw-light fst-italic px-2">- Optional</span> : '' }
      </label>
      <div className="position-relative col-12">
        <input
          {...config}
          className="position-relative col-12 p-2 border-1 border-light rounded shadow-sm"
          value={value}
          required={props.required}
          onChange={event => updateValue(event.target.value)}
        />
        {children}
      </div>
    </>
  );
}
