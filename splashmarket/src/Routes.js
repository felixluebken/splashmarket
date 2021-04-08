import React, { useEffect } from 'react';
import {
  // useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Homepage from './pages/Homepage';
import Loginpage from './pages/Login';
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
