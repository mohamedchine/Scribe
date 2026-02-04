import React from 'react';
import ReactDOM from 'react-dom/client';
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import App from './App';
import AppProvider from './contexts&apicalls/AppProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
  <App />
</AppProvider>
);

