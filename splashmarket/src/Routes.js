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

const Routes = () => {
  const history = useHistory();
  const [user, userDispatch] = useContext(UserContext);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
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
    setIsAuthenticating(false);
  };

  const onGetUserError = (error) => {
    console.log('USER ERROR: ', error.response);
    // Redirect if the user is on the /user without an authenticated user
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

  console.log('USER: ', user);

          return (
          <Router>
            <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route exact path="/login">
                <Loginpage />
              </Route>
              <PrivateRoute isAuthenticating={isAuthenticating}>
                <Route exact path="/user">
                  {user.role === 'admin' ? (
                    <DashboardAdmin />
                  ) : (
                    <DashboardUser />
                  )}
                </Route>
              </PrivateRoute>
              <Route exact path="/user/:id">
                <DashboardUser />
              </Route>

            </Switch>
          </Router>
       )
          }

export default Routes;
