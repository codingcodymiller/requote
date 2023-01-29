import React from 'react';

export default function LoginButton() {
  return (
    <a className="btn btn-navy align-middle d-flex align-items-center mx-2" href="/api/login">
      <i className="fa-brands fa-google pe-2"></i>
      Login
    </a>
  );
}
