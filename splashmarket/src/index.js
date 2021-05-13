import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Homepage from './pages/Homepage'

import Loginpage from './pages/Login'

import Leaderboard from './pages/Leaderboard'

import BotsSearch from './pages/BotsSearch'
import BotsExpand from './pages/BotsExpand'

import Blogs from './pages/Blogs'
import BlogsExpand from './pages/BlogsExpand'
import BlogsEditPopup from './popups/BlogsEditPopup'

import GuidesUser from './pages/GuidesUser'
import GuidesAdmin from './pages/GuidesAdmin'
import GuidesSearch from './pages/GuidesSearch'
import GuidesExpandUser from './pages/GuidesExpandUser'
import GuidesExpandAdmin from './pages/GuidesExpandAdmin'

import DashboardUser from './pages/DashboardUser'
import DashboardAdmin from './pages/DashboardAdmin'
import DashboardUserDroplets from './pages/DashboardUserDroplets'
import DashboardUserDropletsInfo from './pages/DashboardUserDropletsInfo'
import DashboardAdminDroplets from './pages/DashboardAdminDroplets'
import DashboardAdminDropletsInfo from './pages/DashboardAdminDropletsInfo'

import RedeemDropletsPopup from './popups/RedeemDropletsPopup'
import DropletsAdminAddPopup from './popups/DropletsAdminAddPopup'

import GuidesAdminEditPopup from './popups/GuidesAdminEditPopup'
import GuidesAdminAddPopup from './popups/GuidesAdminAddPopup'

import GuidesBotAdminEditPopup from './popups/GuidesBotAdminEditPopup'

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
     <BlogsEditPopup />
     <Leaderboard />
   
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
