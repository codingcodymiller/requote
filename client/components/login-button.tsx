import React from 'react';
import { getCookie } from '../helpers';

export default function LoginButton(){
  const loggedIn = getCookie("access_token")
  return loggedIn
    ? <a className="btn btn-navy align-middle d-flex align-items-center" href="/api/logout">
        <i className="fa-regular fa-right-from-bracket pe-2"></i>
        Logout
      </a>
    : <a className="btn btn-navy align-middle d-flex align-items-center" href="/api/login">
        <i className="fa-brands fa-google pe-2"></i>
        Login
      </a>
}
