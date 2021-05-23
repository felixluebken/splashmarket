import React, { useState, useEffect, useContext } from 'react';
import {
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import DashboardUser from './pages/DashboardUser';
import Homepage from './pages/Homepage';
import Loginpage from './pages/Login';
import DiscordService from './services/DiscordService';
import { UserContext, SET_USER } from './context/UserContext';
import PrivateRoute from './PrivateRoute';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardDroplets from './pages/DashboardDroplets';
import DashboardUserDropletsInfo from './pages/DashboardUserDropletsInfo';
import DashboardAdminDropletsInfo from './pages/DashboardAdminDropletsInfo';
import Leaderboard from './pages/Leaderboard';
import BotsSearch from './pages/BotsSearch';
import BotsExpand from './pages/BotsExpand';
import Guides from './pages/Guides';
import GuidesSearch from './pages/GuidesSearch';
import GuidesExpand from './pages/GuidesExpand';
import Blogs from './pages/Blogs';
import BlogsExpand from './pages/BlogsExpand';
import AdminBots from './pages/AdminBots';
import InformationTOC from './pages/InformationTOC';
import Disclaimer from './pages/Disclaimer';
import CookiePolicy from './pages/PrivacyPolicy';

const Routes = () => {
  const history = useHistory();
  const [user, userDispatch] = useContext(UserContext);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onGetUserSuccess = (response) => {
    userDispatch({
      type: SET_USER,
      payload: {
        value: { ...response.data, isLoggedIn: true },
      },
    });

    if (history.location.pathname === '/authenticate') {
      history.push('/user');
    }
    // Handle authentication
    setIsAuthenticated(true);
    setIsAuthenticating(false);
  };

  const onGetUserError = (error) => {
    console.log('USER ERROR: ', error.response);
    // Redirect if the user is on the /user without an authenticated user
    // Handle authentication
    setIsAuthenticated(false);
    setIsAuthenticating(false);
    if (error && error.response && error.response.status === 404) {
      window.location.href = 'https://discord.com/invite/splashmarket';
    }
    if (history.location.pathnname === '/user') {
      history.push('/');
    }
  };
  const handleUserLogin = async (code) => {
    const onLoginSuccess = async () => {
      await DiscordService.GetUserDiscord(onGetUserSuccess, onGetUserError);
    };
    const onLoginError = (error) => {
      console.log('ERROR: ', error.response);
      // history.push('/');
    };
    await DiscordService.UserLogin(code, onLoginSuccess, onLoginError);
  };
  useEffect(() => {
    if (window.location && window.location.pathname.includes('authenticate')) {
      if (window.location.search) {
        handleUserLogin(window.location.search);
      }
    } else {
      DiscordService.GetUserDiscord(onGetUserSuccess, onGetUserError);
    }
  }, []);

  if (isAuthenticating) {
    return (
      <div className="loading-icon-container" style={{ height: '100%' }}>
        <Loader
          type="Puff"
          color="#00BFFF"
          height={200}
          width={100}
          timeout={15000}
        />
      </div>
    );
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/terms-of-service">
          <InformationTOC />
        </Route>
        <Route exact path="/disclaimer">
          <Disclaimer />
        </Route>
        <Route exact path="/cookie-policy">
          <CookiePolicy />
        </Route>
        <Route exact path="/login">
          <Loginpage />
        </Route>
        <PrivateRoute exact path="/user" isAuthenticated={isAuthenticated} isAuthenticating={isAuthenticating}>
          {(user.role === 'admin' || user.role === 'middleman')
            ? <DashboardAdmin />
            : <DashboardUser />}
        </PrivateRoute>
        <Route exact path="/user/:id">
          <DashboardUser />
        </Route>
        <PrivateRoute exact path="/droplets" isAuthenticated={isAuthenticated} isAuthenticating={isAuthenticating}>
          <DashboardDroplets />
        </PrivateRoute>
        <PrivateRoute exact path="/droplets/:id" isAuthenticated={isAuthenticated} isAuthenticating={isAuthenticating}>
          {user.role === 'admin' ? (
            <DashboardAdminDropletsInfo />
          ) : (
            <DashboardUserDropletsInfo />
          )}
        </PrivateRoute>
        <Route exact path="/user/:id">
          <DashboardUser />
        </Route>
        <Route exact path="/leaderboard">
          <Leaderboard />
        </Route>
        <Route exact path="/bots">
          <BotsSearch />
        </Route>
        <Route exact path="/bots/:bot">
          <BotsExpand />
        </Route>
        <Route exact path="/guides">
          <Guides />
        </Route>
        <Route exact path="/guides/search">
          <GuidesSearch />
        </Route>
        <Route exact path="/guides/:bot">
          <GuidesExpand />
        </Route>
        <Route exact path="/blogs">
          <Blogs />
        </Route>
        <Route exact path="/blogs/:id">
          <BlogsExpand />
        </Route>
        <PrivateRoute exact path="/admin/bots" isAuthenticated={isAuthenticated} isAuthenticating={isAuthenticating}>
          <AdminBots />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
