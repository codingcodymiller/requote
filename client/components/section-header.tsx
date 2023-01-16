import React from 'react';

type HeaderProps = {
  text: string;
}

export default function SectionHeader(props: HeaderProps) {
  return (
    <div className="row justify-content-center">
      <h3 className="col-10 col-xl-12 p-2 mt-2 font-weight-light text-center text-light-grey section-header">
        {props.text}
      </h3>
    </div>
  );
}
