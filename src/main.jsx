/**
 * main.jsx
 * Entry point — renders App into the #root DOM element
 */

import { StrictMode } from 'react';
import { createRoot }  from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
