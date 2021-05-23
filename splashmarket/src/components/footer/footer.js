import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import './footer.css';

const Footer = () => {
  const history = useHistory();
  const [user] = useContext(UserContext);
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
    <div className="footer">
      <div className="footer_main">
        <div className="footer_main-title">
          <div className="logo" />
          <h2 style={{ marginTop: '60px' }}>Splash Market</h2>
        </div>

        <div className="footer_main-res">
          <h3 style={{ marginBottom: '20px' }}>Information</h3>
          <div style={{ display: 'inline-block' }}>
            <ul>
              <li>
                <a
                  role="button"
                  tabIndex={0}
                  aria-label="Home page header"
                  aria-hidden="true"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    handleRedirect('/terms-of-service');
                  }}
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  role="button"
                  tabIndex={0}
                  aria-label="Home page header"
                  aria-hidden="true"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    handleRedirect('/disclaimer');
                  }}
                >
                  Disclaimer
                </a>
              </li>
              <li>
                <a
                  role="button"
                  tabIndex={0}
                  aria-label="Home page header"
                  aria-hidden="true"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    handleRedirect('/cookie-policy');
                  }}
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="footer_main-res" style={{ marginRight: 0 }}>
          <h3 style={{ marginBottom: '20px' }}>Resources</h3>
          <div style={{ display: 'inline-block' }}>
            <ul>
              <li>
                <a
                  role="button"
                  tabIndex={0}
                  aria-label="Home page header"
                  aria-hidden="true"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    handleRedirect('/droplets');
                  }}
                >
                  Droplets
                </a>

              </li>
              <li>
                <a
                  role="button"
                  tabIndex={0}
                  aria-label="Home page header"
                  aria-hidden="true"
                  style={{ cursor: 'pointer' }}
                  onClick={handleDashboardRedirect}
                >
                  Dashboard
                </a>

              </li>
            </ul>
          </div>
        </div>

        <div className="footer_main-nav">
          <h3 style={{ marginBottom: '20px' }}>Navigation</h3>
          <div style={{ width: '50%', height: '100px', float: 'left' }}>
            <ul>
              <li>
                <a
                  role="button"
                  tabIndex={0}
                  aria-label="Home page header"
                  aria-hidden="true"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    handleRedirect('/');
                  }}
                >
                  Home
                </a>

              </li>
              <li>
                <a
                  role="button"
                  tabIndex={0}
                  aria-label="Home page header"
                  aria-hidden="true"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    handleRedirect('/leaderboard');
                  }}
                >
                  Leaderboard
                </a>

              </li>
              <li>
                <a
                  role="button"
                  tabIndex={0}
                  aria-label="Home page header"
                  aria-hidden="true"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    handleRedirect('/bots');
                  }}
                >
                  Bots
                </a>

              </li>
            </ul>

          </div>
          <div style={{ width: '50%', height: '100px', float: 'right' }}>
            <ul>
              <li>
                <a
                  role="button"
                  tabIndex={0}
                  aria-label="Home page header"
                  aria-hidden="true"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    handleRedirect('/blogs');
                  }}
                >
                  Blogs
                </a>

              </li>
              <li>
                <a
                  role="button"
                  tabIndex={0}
                  aria-label="Home page header"
                  aria-hidden="true"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    handleRedirect('/guides');
                  }}
                >
                  Guide
                </a>

              </li>
            </ul>

          </div>
        </div>

      </div>
      <div className="footer_main-low">
        <p className="small" style={{ float: 'left' }}>© 2021, Splash Station</p>

        <a href="https://discord.com/invite/splashmarket" target="_blank" rel="noreferrer">
          <div className="discord_icon" />
        </a>

        <a href="https://twitter.com/splashnetwrk?lang=en" target="_blank" rel="noreferrer">
          <div className="twitter_icon" style={{ marginRight: '10px' }} />
        </a>
      </div>
      <div className="footer_divider" />
      <div className="footer_sub">
        <p className="small">
          We are not affiliated, associated, or endorsed by Cybersole, Wrath, FleekFramework, Kodai, VeloxPreme, GhostAIO, TheKickStation, Mekpreme, Balkbot, ProjectDestroyer, EveAIO, Dashe, BetterNikeBot, SoleAIO, NikeShoeBot, AIOmoji, TheShitBot, Sieupreme, PolarisAIO, CandyPreme or any of its subsidiaries or its affiliates. The names as well as related names, marks, emblems and images are registered trademarks of their respective owners.
        </p>
      </div>
    </div>
  );
};

export default Footer;
