import React, { useContext } from 'react';
import LoginButton from './login-button';
import UserProfileButton from './user-profile-button';
import { UserContext } from '../app';

export default function LoginOrProfile() {
  const { username } = useContext(UserContext);
  return username
    ? <UserProfileButton username={username} />
    : <LoginButton />
}
