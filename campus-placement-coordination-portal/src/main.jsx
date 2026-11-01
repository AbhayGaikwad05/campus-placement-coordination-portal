import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Styling system
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
