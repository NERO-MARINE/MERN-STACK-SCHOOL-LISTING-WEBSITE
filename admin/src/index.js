import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DarkModeContextProvider } from './context/darkModeContext';
import { AuthContextPovider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextPovider>
    <DarkModeContextProvider>
    <App />
    </DarkModeContextProvider>
    </AuthContextPovider>
  </React.StrictMode>
);



