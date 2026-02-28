import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './style.css';

/**
 * Application Entry Point
 * Renders the main App component into the root DOM element
 */
const rootElement = document.getElementById('app');

if (!rootElement) {
  throw new Error('Root element #app not found in the DOM');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);