import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app';

const root = createRoot(document.getElementById('root')!) //exclamation mark tells typescript there is no possibility of the return being null

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
