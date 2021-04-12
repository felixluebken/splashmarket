import React from 'react';
import './header.css';
import { useHistory } from 'react-router-dom';

function HeaderLoggedIn() {
  const history = useHistory();

  const handleRedirect = (route) => {
    history.push(route);
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
        <div className="dark_button-solid" style={{ width: 123, height: 35 }}>
          <span className="dark_button-solid-text">Log Out</span>
        </div>
        <div className="dark_button" style={{ width: 123, height: 35 }}>
          <span className="dark_button-text">Droplets</span>
        </div>
      </div>
    </div>
  );
}

export default HeaderLoggedIn;
