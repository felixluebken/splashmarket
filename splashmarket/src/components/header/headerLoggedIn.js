import React, { useContext } from 'react';
import './header.css';
import { useHistory } from 'react-router-dom';
import DiscordService from '../../services/DiscordService';
import { SET_USER, UserContext } from '../../context/UserContext';

const HeaderLoggedIn = () => {
  const [user, userDispatch] = useContext(UserContext);
  const history = useHistory();

  const handleRedirect = (route) => {
    console.log('HANDLING REDIRECT', route);
    history.push(route);
  };

  const handleLogout = () => {
    const onLogoutSuccess = () => {
      userDispatch({
        type: SET_USER,
        payload: {
          value: { ...user, isLoggedIn: false },
        },
      });
      handleRedirect('/');
    };
    const onLogoutError = () => {
      userDispatch({
        type: SET_USER,
        payload: {
          value: { ...user, isLoggedIn: false },
        },
      });
      handleRedirect('/');
    };

    DiscordService.UserLogout(onLogoutSuccess, onLogoutError);
  };

  return (
    <div className="header">
      <div
        className="logo"
        role="button"
        tabIndex={0}
        aria-label="Home page header"
        aria-hidden="true"
        onClick={() => {
          handleRedirect('/');
        }}
        style={{ margin: '10px auto', cursor: 'pointer' }}
      />
      <div className="button_group" style={{ margin: '10px auto' }}>
        <div
          className="dark_button-solid"
          style={{ width: 123, height: 35 }}
          role="button"
          tabIndex={0}
          aria-label="Home page header"
          aria-hidden="true"
          onClick={handleLogout}
        >
          <span className="dark_button-solid-text">Log Out</span>
        </div>
        <div
          role="button"
          tabIndex={0}
          aria-label="Home page header"
          aria-hidden="true"
          onClick={() => {
            handleRedirect('/droplets');
          }}
          className="dark_button"
          style={{ width: 123, height: 35 }}
        >
          <span className="dark_button-text">Droplets</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderLoggedIn;
