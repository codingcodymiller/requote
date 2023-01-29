import React from 'react';

export default function LogoutButton() {
  return (
    <a className="btn btn-navy align-middle d-flex align-items-center mx-2" href="/api/logout">
      <i className="fa-regular fa-right-from-bracket pe-2"></i>
      Logout
    </a>
  );
}
