import React from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from '../components/app-header';

export default function Library() {
  return (
    <>
      <AppHeader />
      <main className="bg-lavender-grey rounded-border-top main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
}
