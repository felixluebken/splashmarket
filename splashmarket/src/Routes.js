<<<<<<< HEAD
import React, { useEffect } from 'react';
import {
  // useHistory,
=======
import React from 'react';
import {
  useHistory,
>>>>>>> c9b84a3... Added eslint and router
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Homepage from './pages/Homepage';
import Loginpage from './pages/Login';
<<<<<<< HEAD
import DiscordService from './services/DiscordService';

const Routes = () => {
  // const history = useHistory();

  const handleUserLogin = async (code) => {
    const onLoginSuccess = (response) => {
      console.log('RESP SUCCESS: ', response);
    };
    const onLoginError = (error) => {
      console.log('ERROR: ', error.response);
    };
    await DiscordService.UserLogin(code, onLoginSuccess, onLoginError);
  };
  useEffect(() => {
    if (window.location && window.location.pathname === '/authenticate') {
      if (window.location.search) {
        handleUserLogin(window.location.search);
      }
    }
  }, []);
=======

const Routes = () => {
  const history = useHistory();
  console.log('HISTORY: ', history);
>>>>>>> c9b84a3... Added eslint and router
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/login">
          <Loginpage />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
