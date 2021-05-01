/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import './header.css';

const HeaderHomepage = () => {
  const [user] = useContext(UserContext);
  const history = useHistory();
  const handleRedirect = (route) => {
    history.push(route);
  };

  const handleDashboardRedirect = () => {
    if (user.isLoggedIn) {
      history.push('/user');
    } else {
      history.push('/login');
    }
  };

  return (
    <div className="header">
      <div
        className="logo"
        role="button"
        tabIndex={0}
        aria-label="Home page header"
        aria-hidden="true"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          handleRedirect('/');
        }}
      />
      <div className="nav">
        <a
          role="button"
          tabIndex={0}
          aria-label="Home page header"
          aria-hidden="true"
          onClick={() => {
            handleRedirect('/');
          }}
          className="currentPage"
        >
          Home

        </a>
        <a
          role="button"
          tabIndex={0}
          aria-label="Home page header"
          aria-hidden="true"
          onClick={() => {
            handleRedirect('/leaderboard');
          }}
        >
          Leaderboard
        </a>
        <a
          role="button"
          tabIndex={0}
          aria-label="Home page header"
          aria-hidden="true"
          onClick={() => {
            handleRedirect('/bots');
          }}
        >
          Bots
        </a>
        <a>Blogs</a>
        <a
          role="button"
          tabIndex={0}
          aria-label="Home page guides"
          aria-hidden="true"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            handleRedirect('/guides');
          }}
        >
          Guides
        </a>
      </div>
      <div className="button_group">
        <div
          className="blue_button"
          style={{ width: 123, height: 35 }}
          role="button"
          tabIndex={0}
          aria-hidden="true"
          onClick={handleDashboardRedirect}
        >
          <span className="blue_button-text">Dashboard</span>
        </div>
        <div className="dark_button" style={{ width: 123, height: 35 }}>
          <span className="dark_button-text">Droplets</span>
        </div>
      </div>
    </div>

  );
};

export default HeaderHomepage;
