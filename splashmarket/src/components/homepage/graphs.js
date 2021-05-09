import React from 'react';
import './homepage.css';
import { useHistory } from 'react-router-dom';

function HomepageGraphs() {
  const history = useHistory();

  const handleRedirect = (route) => {
    history.push(route);
  };
  return (
    <div className="section_graphs">
      <div className="graphs_img" />
      <div className="graphs_text">
        <span
          className="section_title-blue"
          role="button"
          tabIndex={0}
          aria-label="Home page header"
          aria-hidden="true"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            handleRedirect('/bots');
          }}
        >
          Market Graphs for Bots
        </span>
        <span className="section_title-big">Quickly view important data and overviews of many bots.</span>
        <span className="section_text">It has never been easier to view the market prices, trends, and analytics of any bot. Easily accessible and informative data.</span>
        <a>
          <div
            className="blue_button-bots"
            role="button"
            tabIndex={0}
            aria-label="Home page header"
            aria-hidden="true"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleRedirect('/bots');
            }}
          >
            <span className="blue_button-bots-text">View all bots</span>
          </div>
        </a>
      </div>

    </div>
  );
}

export default HomepageGraphs;
