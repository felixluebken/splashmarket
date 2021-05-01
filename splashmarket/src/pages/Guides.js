import React, { useState, useContext } from 'react';
import './Guides.css';
import { UserContext } from '../context/UserContext';
import HeaderGuide from '../components/header/headerGuide';
import Footer from '../components/footer/footer';

import PageSwitch from '../components/page-switch/PageSwitch';

import GuideBotPanel from '../components/panels/GuideBotPanelUser';
import GuidesAdminAddPopup from '../popups/GuidesAdminAddPopup';

/*
currentResults          -str
totalResults            -str

*/

const Guides = () => {
  const [user] = useContext(UserContext);
  const [isAddBotModalVisible, setIsAddBotModalVisible] = useState(false);
  const { role } = user;

  console.log('USER: ', user);
  const handleToggleAddBotModal = () => {
    setIsAddBotModalVisible(!isAddBotModalVisible);
  };

  return (
    <>
      {isAddBotModalVisible && (
      <GuidesAdminAddPopup handleToggleAddBotModal={handleToggleAddBotModal} />
      )}

      <div className="guides_header-container">
        <HeaderGuide />
        <div className="guides_header-container_banner">
          <h3 className="guides_title">Bot information & guides</h3>
        </div>
      </div>

      <div className="search-frame_guides">
        <div className="search_icon" />
        <input className="guides_search" placeholder="Search Bot Guides..." style={{ margin: '20px 0px' }} />
        <div className="search_divider" style={{ margin: '15px 10px' }} />
        <div className="filter_icon" style={{ margin: '20px 10px' }} />
        <select className="guides_filter" style={{ margin: '21px 0px' }}>
          <option>Filter...</option>
          <option>1</option>
          <option>2</option>
        </select>
        <div className="blue_button-search" style={{ margin: '15px' }}>
          <span className="blue_button-search-text">Search</span>
        </div>
      </div>

      {user && role === 'admin' && (
      <div className="guides_admin-button-container">
        {/* <div className="guides_admin-delete_all_button">
          <span className="guides_admin-button_text">Delete All</span>
        </div> */}

        <div
          className="guides_admin-add_button"
          role="button"
          tabIndex={0}
          aria-label="Home page header"
          aria-hidden="true"
          style={{ cursor: 'pointer' }}
          onClick={handleToggleAddBotModal}
        >
          <span
            className="guides_admin-button_text"

          >
            Add Bot
          </span>
        </div>
      </div>
      )}

      <div className="guides_search_results-container">
        <p className="panel_text-light">
          {/* Showing
          {' '}
          {currentResults}
          {' '}
          of
          {' '}
          {totalResults}
          {' '}
          bots */}
        </p>
      </div>

      <div className="guides_panel-container">
        {/* <GuideBotPanel iconBackgroundColor="green" botName="Cybersole" guideUrl="https://google.com" />
        <GuideBotPanel iconBackgroundColor="green" botName="Cybersole" />
        <GuideBotPanel iconBackgroundColor="green" botName="Cybersole" />
        <GuideBotPanel iconBackgroundColor="green" botName="Cybersole" />
        <GuideBotPanel iconBackgroundColor="green" botName="Cybersole" />
        <GuideBotPanel iconBackgroundColor="green" botName="Cybersole" />
        <GuideBotPanel iconBackgroundColor="green" botName="Cybersole" />
        <GuideBotPanel iconBackgroundColor="green" botName="Cybersole" />
        <GuideBotPanel iconBackgroundColor="green" botName="Cybersole" />
        <GuideBotPanel iconBackgroundColor="green" botName="Cybersole" />
        <GuideBotPanel iconBackgroundColor="green" botName="Cybersole" /> */}
      </div>

      <PageSwitch />

      <Footer />
    </>
  );
};
export default Guides;
