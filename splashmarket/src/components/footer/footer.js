import React from 'react';
import './footer.css';

function Footer() {
  return (
    <div className="footer">
      <div className="footer_main">
        <div className="footer_main-title">
          <div className="logo" />
          <h2 style={{ marginTop: '60px' }}>Lorem ipsum dolor sit amet</h2>
        </div>

        <div className="footer_main-res">
          <h3 style={{ marginBottom: '20px' }}>Resources</h3>
          <div style={{ display: 'inline-block' }}>
            <ul>
              <li><a>Droplets</a></li>
              <li><a>Dashboard</a></li>
            </ul>
          </div>

        </div>

        <div className="footer_main-nav">
          <h3 style={{ marginBottom: '20px' }}>Navigation</h3>
          <div style={{ width: '50%', height: '100px', float: 'left' }}>
            <ul>
              <li><a>Home</a></li>
              <li><a>Leaderboard</a></li>
              <li><a>Bots</a></li>
            </ul>

          </div>
          <div style={{ width: '50%', height: '100px', float: 'right' }}>
            <ul>
              <li><a>Blogs</a></li>
              <li><a>Guide</a></li>
            </ul>

          </div>
        </div>

      </div>
      <div className="footer_main-low">
        <p className="small" style={{ float: 'left' }}>© 2021, Splash Station</p>

        <a>
          <div className="discord_icon" />
        </a>

        <a>
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
}

export default Footer;
