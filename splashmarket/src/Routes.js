import React, { useEffect, useContext } from 'react';
import {
  useHistory,
<<<<<<< HEAD
>>>>>>> c9b84a3... Added eslint and router
  BrowserRouter as Router,
=======
>>>>>>> 4d6591f... Finishing user dashboard
  Switch,
  Route,
} from 'react-router-dom';
import DashboardUser from './pages/DashboardUser';
import Homepage from './pages/Homepage';
import Loginpage from './pages/Login';
<<<<<<< HEAD
import DiscordService from './services/DiscordService';
import { UserContext, SET_USER } from './context/UserContext';

const Routes = () => {
  const history = useHistory();
  const [, userDispatch] = useContext(UserContext);

  const onGetUserSuccess = (response) => {
    userDispatch({
      type: SET_USER,
      payload: {
        value: response.data,
      },
    });
    history.push('/user');
  };

  const onGetUserError = (error) => {
    console.log('ERROR: ', error.response);
    history.push('/');
  };
  const handleUserLogin = async (code) => {
    const onLoginSuccess = async () => {
      await DiscordService.GetUserDiscord(onGetUserSuccess, onGetUserError);
    };
    const onLoginError = (error) => {
      console.log('ERROR: ', error.response);
      history.push('/');
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
<<<<<<< HEAD
=======

const Routes = () => {
  const history = useHistory();
  console.log('HISTORY: ', history);
>>>>>>> c9b84a3... Added eslint and router
=======

>>>>>>> 4d6591f... Finishing user dashboard
  return (
  // <Router>
    <Switch>
      <Route exact path="/">
        <Homepage />
      </Route>
      <Route exact path="/login">
        <Loginpage />
      </Route>
      <Route exact path="/user">
        <DashboardUser />
      </Route>
    </Switch>
  // </Router>
  );
};

export default Routes;
