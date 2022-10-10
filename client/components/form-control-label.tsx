import React from 'react';

type LabelData = {
  id: string;
  label: string;
  optional?: boolean;
}

export default function FormControlInput(props: LabelData) {
  return (
    <label htmlFor={props.id} className="d-inline-block px-2 my-2">
      {props.label}
      {props.optional ? <span className="text-secondary fw-light fst-italic px-2">- Optional</span> : ''}
    </label>
  );
}
