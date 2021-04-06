import React from 'react';
import './loginPanel.css';

function LoginPanel() {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 15ebc17... Finishing oauth login flow
  const handleRedirect = (route) => {
    console.log('ROUTE: ', route);
    window.location.href = route;
  };

<<<<<<< HEAD
=======
>>>>>>> 1477cb1... Added eslint and router
=======
>>>>>>> 15ebc17... Finishing oauth login flow
=======
>>>>>>> c9b84a3... Added eslint and router
  return (
    <div className="login_panel">
      <div className="logo-login" />
      <span className="login-title">Login</span>
      <p>to access your dashboard</p>
      <a>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 15ebc17... Finishing oauth login flow
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
<<<<<<< HEAD
          <div className="discord_icon-login" />
          <span className="blue_button-login-text">Login with Discord</span>
        </div>
        {/* </div> */}
=======
        <div className="blue_button-login">
          <div className="discord_icon-login" />
          <span className="blue_button-login-text">Login with Discord</span>
        </div>
>>>>>>> 1477cb1... Added eslint and router
=======
          <div className="discord_icon-login" />
          <span className="blue_button-login-text">Login with Discord</span>
        </div>
        {/* </div> */}
>>>>>>> 15ebc17... Finishing oauth login flow
=======
        <div className="blue_button-login">
          <div className="discord_icon-login" />
          <span className="blue_button-login-text">Login with Discord</span>
        </div>
>>>>>>> c9b84a3... Added eslint and router
      </a>

    </div>
  );
}

export default LoginPanel;
