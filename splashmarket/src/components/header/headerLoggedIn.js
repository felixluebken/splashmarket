import React from 'react';
import './header.css';

function HeaderLoggedIn() {
  return (
    <div className="header">
      <div className="logo" style={{ margin: '10px auto' }} />
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
