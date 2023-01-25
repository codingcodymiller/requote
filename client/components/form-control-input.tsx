import React, { Dispatch, SetStateAction } from 'react';

type InputAttributes = {
  name: string;
  type: string;
  value: any;
  updateValue: Dispatch<SetStateAction<any>>;
  className?: string;
  id?: string ;
  placeholder?: string;
  required?: boolean;
}

export default function FormControlInput(props: InputAttributes) {
  const { value, updateValue, name, type, required, id, placeholder, className } = props;
  return (
    <input
      className={className || ''}
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
