/* eslint-disable new-cap */
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { verifyAdmin } from '../../helpers/helpers';
import BlogsEditPopup from '../../popups/BlogsEditPopup';
import './panels.css';

/*

imageUrl            -str

headerIcon          -str
botName             -str
title               -str

authorAvatar        -str
authorUsername      -str

publishDate         -str

*/

function BotBlogPanelExpand(props) {
  const {
    imageUrl, headerIcon, publishDate, botName, bodyColor, titleColor, title, authorAvatar, authorUsername, fileContents, blog, getBlog,
  } = props;
  const [user] = useContext(UserContext);
  const [botIcon, setBotIcon] = useState(null);
  const [isAddBlogModalVisible, setIsAddBlogModalVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const handleToggleAddBlogModal = () => {
    setIsAddBlogModalVisible(!isAddBlogModalVisible);
  };

  useEffect(() => {
    if (fileContents && fileContents.buffer) {
      const img = new Buffer.from(fileContents.buffer).toString('base64');
      setBotIcon(`data:image/png;base64,${img}`);
    }
  }, [fileContents]);
  useEffect(() => {
    setIsAdmin(verifyAdmin(user.role, user.isLoggedIn));
  }, []);
  return (
    <div className="bot_blog_panel-expand">
      {isAddBlogModalVisible && (
      <BlogsEditPopup handleToggleAddBlogModal={handleToggleAddBlogModal} blog={blog} getBlog={getBlog} />
      )}
      <div className="bot_blog_panel-expand-img" style={{ backgroundImage: `url(${imageUrl})` }} />

      <div className="bot_blog_panel-expand-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p className="bot_blog_panel-publish_date">
            Published
            {' '}
            {publishDate}
          </p>

          {isAdmin && (
          <div
            className="popup_blue-btn"
            role="button"
            tabIndex={0}
            aria-label="Home page header"
            aria-hidden="true"
            onClick={handleToggleAddBlogModal}
          >
            <span className="popup_blue-btn_text">Edit Blog</span>
          </div>
          )}

        </div>

        <div className="bot_blog_panel-large-bot_container">
          <div className="blog_bot_panel-icon" style={{ backgroundImage: `url(${botIcon})`, marginLeft: 0 }} />
          <p className="blog_bot_panel-title" style={{ color: 'white' }}>{botName}</p>
        </div>

        <h4 className="blog_bot_panel-expand-title" style={{ color: titleColor || 'white' }}>{title}</h4>
        <div className="blog_bot_panel-divider" />

        <div className="blog_bot_panel-author">
          <div className="blog_bot_panel-author-avatar" style={{ backgroundImage: `url(${authorAvatar})` }} />
          <p className="panel_text-normal-small " style={{ float: 'left', margin: '20px 0px 0px 10px' }}>{authorUsername}</p>
        </div>
      </div>

    </div>

  );
}

export default BotBlogPanelExpand;
