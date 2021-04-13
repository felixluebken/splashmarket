import React, { useEffect, useContext } from 'react';
import {
  useHistory,
  Switch,
  Route,
} from 'react-router-dom';
import DashboardUser from './pages/DashboardUser';
import Homepage from './pages/Homepage';
import Loginpage from './pages/Login';
import DiscordService from './services/DiscordService';
import { UserContext, SET_USER } from './context/UserContext';
// import DashboardAdmin from './pages/DashboardAdmin';

const Routes = () => {
  const history = useHistory();
  const [, userDispatch] = useContext(UserContext);

  const onGetUserSuccess = (response) => {
    userDispatch({
      type: SET_USER,
      payload: {
        value: { ...response.data, isLoggedIn: true },
      },
    });
    history.push('/user');
  };

  const onGetUserError = (error) => {
    console.log('ERROR: ', error.response);
    if (history.location.pathnname !== '/') {
      history.push('/');
    }
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
    } else {
      DiscordService.GetUserDiscord(onGetUserSuccess, onGetUserError);
    }
  }, []);

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
        {/* {user.role === 'admin' ? (
          <DashboardAdmin />
        ) : ( */}
        <DashboardUser />
        {/* )} */}
      </Route>
    </Switch>
  // </Router>
  );
};

export default Routes;
