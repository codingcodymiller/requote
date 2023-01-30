import React from 'react';

export default function LogoutButton() {
  return (
    <a className="btn btn-lg btn-danger opacity-75 align-middle d-flex align-items-center mx-2" href="/api/logout">
      <i className="fa-regular fa-right-from-bracket pe-2"></i>
      Log Out
    </a>
  );
}
