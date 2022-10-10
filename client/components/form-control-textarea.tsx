import React, { useState } from 'react';

type TextAreaAttributes = {
  name: string;
  id?: string;
  rows?: number;
  placeholder?: string;
  required?: boolean
}

export default function FormControlTextArea(props: TextAreaAttributes) {
  const [value, updateValue] = useState('');
  return (
    <textarea
      className="position-relative col-12 h-100 p-2 border-1 border-light rounded shadow-sm"
      value={value}
      name={props.name}
      required={props.required}
      id={props.id || undefined}
      rows={props.rows || undefined}
      placeholder={props.placeholder || ""}
      onChange={event => updateValue(event.target.value)}
    />
  );
}
