import React, { useState, useEffect, useContext } from 'react';
import {
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import DashboardUser from './pages/DashboardUser';
import Homepage from './pages/Homepage';
import Loginpage from './pages/Login';
import DiscordService from './services/DiscordService';
import { UserContext, SET_USER } from './context/UserContext';
import PrivateRoute from './PrivateRoute';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardAdminDroplets from './pages/DashboardAdminDroplets';
import DashboardUserDroplets from './pages/DashboardUserDroplets';
import DashboardAdminDropletsInfo from './pages/DashboardAdminDropletsInfo';
import Leaderboard from './pages/Leaderboard';
import BotsSearch from './pages/BotsSearch';
import BotsExpand from './pages/BotsExpand';
import Guides from './pages/Guides';

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
    return <h1>Loading</h1>;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/login">
          <Loginpage />
        </Route>
        <PrivateRoute exact path="/user" isAuthenticated={isAuthenticated} isAuthenticating={isAuthenticating}>
          {user.role === 'admin'
            ? <DashboardAdmin />
            : <DashboardUser />}
        </PrivateRoute>
        <PrivateRoute exact path="/droplets" isAuthenticated={isAuthenticated} isAuthenticating={isAuthenticating}>
          {user.role === 'admin' ? (
            <DashboardAdminDroplets />
          ) : (
            <DashboardUserDroplets />
          )}
        </PrivateRoute>
        <PrivateRoute exact path="/droplets/:id" isAuthenticated={isAuthenticated} isAuthenticating={isAuthenticating}>
          {user.role === 'admin' ? (
            <DashboardAdminDropletsInfo />
          ) : (
            <DashboardUserDroplets />
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
      </Switch>
    </Router>
  );
};

export default Routes;
