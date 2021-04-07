import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Homepage from './pages/Homepage'
import Loginpage from './pages/Login'
import DashboardUser from './pages/DashboardUser'
import DashboardAdmin from './pages/DashboardAdmin'

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <DashboardAdmin
          dashboardGreeting="Good Afternoon,"
          username="dearchitect"
          avatar="https://cdn.discordapp.com/avatars/638784999293976635/06d1e75f49559a1b16e6d127ec1c4fbf.jpg"
          discriminator="#0001"
          transactions="321"
          totalSold="10"
          totalPurchased="123"
          droplets="12"
    />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
