import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// import Homepage from './pages/Homepage';
// import Leaderboard from './pages/Leaderboard';
// import BotsSearch from './pages/BotsSearch';

// import Loginpage from './pages/Login';

// import DashboardUser from './pages/DashboardUser';
// import DashboardAdmin from './pages/DashboardAdmin';
// import DashboardUserDroplets from './pages/DashboardUserDroplets';
// import DashboardUserDropletsInfo from './pages/DashboardUserDropletsInfo';
// import DashboardAdminDroplets from './pages/DashboardAdminDroplets';
// import DashboardAdminDropletsInfo from './pages/DashboardAdminDropletsInfo';

// import RedeemDropletsPopup from './popups/RedeemDropletsPopup';
// import DropletsAdminAddPopup from './popups/DropletsAdminAddPopup';

import reportWebVitals from './reportWebVitals';

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
