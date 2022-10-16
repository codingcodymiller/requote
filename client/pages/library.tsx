import React from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from '../components/app-header';

export default function Library() {
  return (
    <Outlet />
  );
}
