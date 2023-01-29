import React from 'react';
import LoginButton from './login-button';
import UserProfileButton from './user-profile-button';
import { getCookie } from '../helpers';

export default function LoginOrProfile() {
  const username = getCookie("username")
  return username
    ? <UserProfileButton username={username} />
    : <LoginButton />
}
