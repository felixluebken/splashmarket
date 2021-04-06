import React from 'react';
import './homepage.css';

function HomepageGraphs() {
  return (
    <div className="section_graphs">
      <div className="graphs_img" />
      <div className="graphs_text">
        <span className="section_title-blue">Member Leaderboard</span>
        <span className="section_title-big">View the members with the most transactions</span>
        <span className="section_text">Never worry about the reputation of your buyer or seller again. Splash Market makes it easy for you to verify any user.</span>
        <a>
          <div className="blue_button-bots">
            <span className="blue_button-bots-text">View all bots</span>
          </div>
        </a>
      </div>

    </div>
  );
}

export default HomepageGraphs;
