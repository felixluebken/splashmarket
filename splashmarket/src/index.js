import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './App';
import './index.css';

import Homepage from './pages/Homepage';

import Loginpage from './pages/Login';

import Leaderboard from './pages/Leaderboard';

import BotsSearch from './pages/BotsSearch';
import BotsExpand from './pages/BotsExpand';

import Blogs from './pages/Blogs';
import BlogsExpand from './pages/BlogsExpand';

import Guides from './pages/Guides';
import GuidesSearch from './pages/GuidesSearch';
import GuidesExpand from './pages/GuidesExpand';

// import RedeemDropletsPopup from './popups/RedeemDropletsPopup';
// import DropletsAdminAddPopup from './popups/DropletsAdminAddPopup';

import GuidesAdminEditPopup from './popups/GuidesAdminEditPopup';
import GuidesAdminAddPopup from './popups/GuidesAdminAddPopup';

import reportWebVitals from './reportWebVitals';

// Change this in prod
axios.defaults.baseURL = 'http://localhost:8000/';
// axios.defaults.baseURL = 'https://splash-market-server.herokuapp.com/';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
