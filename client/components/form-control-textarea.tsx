import React, { Dispatch, SetStateAction } from 'react';

type TextAreaAttributes = {
  name: string;
  value: string;
  updateValue: Dispatch<SetStateAction<string>>;
  id?: string;
  rows?: number;
  placeholder?: string;
  required?: boolean
}

export default function FormControlTextArea(props: TextAreaAttributes) {
  const {value, updateValue, name, required, id, rows, placeholder} = props;
  return (
    <textarea
      className="position-relative col-12 h-100 p-2 border-1 border-light rounded shadow-sm"
      value={value}
      name={name}
      required={required}
      id={id || undefined}
      rows={rows || undefined}
      placeholder={placeholder || ""}
      onChange={event => updateValue(event.target.value)}
    />
  );
}
