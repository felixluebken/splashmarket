import React, { useState, useEffect } from 'react';
import './Bots.css';
import HeaderBots from '../components/header/headerBots';
import Footer from '../components/footer/footer';
import PageSwitch from '../components/page-switch/PageSwitch';
import BotPanel from '../components/panels/BotPanel';
import BotService from '../services/BotService';

const BotsSearch = (props) => {
  const [bots, setBots] = useState([]);

  // Need to do paging
  useEffect(() => {
    const onFindBotsSuccess = (response) => {
      setBots(response.data);
    };
    const onFindBotsError = (error) => {
      console.log('ERROR: ', error.response);
    };
    BotService.FindBotsWithGraphs(onFindBotsSuccess, onFindBotsError);
  }, []);

  const { currentResults, totalResults } = props;

  return (
    <>
      <div className="bots_header-container">
        <HeaderBots />
        <div className="bots_header-container_banner">
          <h3 className="bots_title">Stock market for bots.</h3>
        </div>
      </div>

      <div className="bots_search-frame">
        <div className="bots_search-main_frame">
          <div className="search_icon" />
          <input className="bots_search" type="text" placeholder="Search bots..." />
        </div>
        <div className="bots_search-btn">
          <span className="bots_search-btn_text">Search</span>
        </div>
      </div>

      <div className="bots_search_results-container">
        <p className="panel_text-light">
          Showing
          {' '}
          {currentResults}
          {' '}
          of
          {' '}
          {totalResults}
          {' '}
          bots
        </p>
      </div>

      <div className="bots_panel-container">
        {bots && bots.map((bot) => {
          const {
            _id, displayName, logo,
          } = bot;
          return (
            <BotPanel key={_id} name={displayName} iconUrl={logo} />

          );
        })}
      </div>

      <PageSwitch />
      <Footer />
    </>
  );
};

export default BotsSearch;
