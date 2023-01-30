import React from 'react';
import { Link } from 'react-router-dom';

type ProfileButtonProps = {
  username: string;
}

export default function UserProfileButton({ username }: ProfileButtonProps) {
  return (
    <Link className="btn btn-navy align-middle d-flex align-items-center mx-2" to="/profile">
      <i className={`fa-regular fa-lg fa-square-user pe-2`}></i>
      { username }
    </Link>
  );
}
