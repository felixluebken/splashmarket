import React from 'react';
import './header.css';

function HeaderBlogs() {
  return (
    <div className="header">
      <div className="logo" />
      <div className="nav">
        <a>Home</a>
        <a>Leaderboard</a>
        <a>Bots</a>
        <a className="currentPage">Blogs</a>
        <a>Guides</a>
      </div>
      <div className="button_group">
        <div className="blue_button" style={{ width: 123, height: 35 }}>
          <span className="blue_button-text">Dashboard</span>
        </div>
        <div
          className="dark_button"
          style={{ width: 123, height: 35, cursor: 'pointer' }}
          role="button"
          tabIndex={0}
          aria-label="Home page header"
          aria-hidden="true"
          // onClick={() => {
          //   handleRedirect('/droplets');
          // }}
        >
          <span className="dark_button-text">Droplets</span>
        </div>
      </div>
    </div>

  );
}

export default HeaderBlogs;
