import React from 'react';
import './loginPanel.css';

function LoginPanel() {
  const handleRedirect = (route) => {
    console.log('ROUTE: ', route);
    window.location.href = route;
  };

  return (
    <div className="login_panel">
      <div className="logo-login" />
      <span className="login-title">Login</span>
      <p>to access your dashboard</p>
      <a>
        {/* <div className="blue_button-login"> */}
        <div
          className="blue_button-login"
          role="button"
          tabIndex={0}
          aria-label="Home page header"
          aria-hidden="true"
          onClick={() => {
            handleRedirect(process.env.REACT_APP_DISCORD_OAUTH_URL);
          }}
        >
          <div className="discord_icon-login" />
          <span className="blue_button-login-text">Login with Discord</span>
        </div>
        {/* </div> */}
      </a>

    </div>
  );
}

export default LoginPanel;
