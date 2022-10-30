import React, { Dispatch, SetStateAction } from 'react';

type InputAttributes = {
  name: string;
  type: string;
  value: string;
  updateValue: Dispatch<SetStateAction<string>>;
  id?: string ;
  placeholder?: string;
  required?: boolean
}

export default function FormControlInput(props: InputAttributes) {
  const { value, updateValue, name, type, required, id, placeholder } = props;
  return (
    <input
      className="position-relative col-12 p-2 border-1 border-light rounded shadow-sm"
      value={value}
      name={name}
      type={type}
      required={required}
      id={id || undefined}
      placeholder={placeholder || ""}
      onChange={event => updateValue(event.target.value)}
    />
  );
}
