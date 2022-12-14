import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/Post.css';
import './styles/Navbar.css';
import './styles/AuthForm.css';
import './styles/Upload.css';
import './styles/Profile.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    );
