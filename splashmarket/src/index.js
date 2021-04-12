import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Homepage from './pages/Homepage'
import Leaderboard from './pages/Leaderboard'

import Loginpage from './pages/Login'
import DashboardUser from './pages/DashboardUser'
import DashboardAdmin from './pages/DashboardAdmin'


import DashboardUserDroplets from './pages/DashboardUserDroplets'
import DashboardUserDropletsInfo from './pages/DashboardUserDropletsInfo'
import DashboardAdminDroplets from './pages/DashboardAdminDroplets'
import DashboardAdminDropletsInfo from './pages/DashboardAdminDropletsInfo'

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Leaderboard />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
