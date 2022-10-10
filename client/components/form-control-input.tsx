import React, { useState } from 'react';

type InputAttributes = {
  name: string;
  type: string;
  id?: string ;
  placeholder?: string;
  required?: boolean
}

export default function FormControlInput(props: InputAttributes) {
  const [value, updateValue] = useState('');
  return (
    <input
      className="position-relative col-12 p-2 border-1 border-light rounded shadow-sm"
      value={value}
      name={props.name}
      type={props.type}
      required={props.required}
      id={props.id || undefined}
      placeholder={props.placeholder || ""}
      onChange={event => updateValue(event.target.value)}
    />
  );
}
