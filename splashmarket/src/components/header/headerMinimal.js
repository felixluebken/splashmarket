import React from 'react';
import { useHistory } from 'react-router-dom';
import './header.css';

function HeaderMinimal() {
<<<<<<< HEAD
    return(
        <div className="header">
            <div className="logo" style={{margin:"10px auto"}}></div>

            <div className="button_group">
                <div className="dark_button" style={{width:123,height:35,float:"none",margin:"10px auto"}}>
                    <span className="dark_button-text">Droplets</span>
                </div>
            </div>
=======
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
      />
      <div className="button_group">
        <div
          className="dark_button"
          style={{
            width: 123, height: 35, float: 'none', margin: '10px auto',
          }}
        >
          <span className="dark_button-text">Droplets</span>
>>>>>>> c9b84a3... Added eslint and router
        </div>
      </div>
    </div>

  );
}

export default HeaderMinimal;
