import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './App';

// Initialize Norigin Spatial Navigation
import { init } from '@noriginmedia/norigin-spatial-navigation';

init({
  debug: false,
  distanceCalculationMethod: 'center',
});

// Create root and render app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);