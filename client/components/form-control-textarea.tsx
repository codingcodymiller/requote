import React, { useState } from 'react';

export default function FormControlTextArea(props) {
  const [value, updateValue] = useState('');
  const { children, optional, ...config } = props;
  return (
    <>
      <label htmlFor={props.id} className="d-inline-block px-2 my-2">
        {props.label}
        {optional ? <span className="text-secondary fw-light fst-italic px-2">- Optional</span> : ''}
      </label>
      <div className="position-relative col-12">
        <textarea
          {...config}
          className="position-relative col-12 h-100 p-2 border-1 border-light rounded shadow-sm"
          value={value}
          onChange={event => updateValue(event.target.value)}
          required={props.required}
        />
        {children}
      </div>
    </>
  );
}
