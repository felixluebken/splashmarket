/* eslint-disable new-cap */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './panels.css';

/*

imageUrl            -str

headerIcon          -str
botName             -str
title               -str

authorAvatar        -str
authorUsername      -str

blogUrl             -str

publishDate         -str
*/

function BotBlogPanelLarge(props) {
  const {
    imageUrl, publishDate, botName, title, authorAvatar, authorUsername, fileContents, isNewPost, id,
  } = props;
  const history = useHistory();
  const [botIcon, setBotIcon] = useState(null);

  useEffect(() => {
    if (fileContents.buffer) {
      const img = new Buffer.from(fileContents.buffer).toString('base64');
      setBotIcon(`data:image/png;base64,${img}`);
    }
  }, [fileContents]);

  const handleRedirect = (route) => {
    history.push(route);
  };

  return (
    <a
      role="button"
      tabIndex={0}
      aria-label="Home page header"
      aria-hidden="true"
      onClick={() => {
        handleRedirect(`/blogs/${id}`);
      }}
    >
      <div className="bot_blog_panel-large">

        <div className="bot_blog_panel-large-img" style={{ backgroundImage: `url(${imageUrl})` }}>
          {isNewPost && (
          <div className="bot_blog_panel-large-new_container">
            <span className="bot_blog_panel-large-new_text">New Post</span>
          </div>
          )}
        </div>

        <div className="bot_blog_panel-large-content">
          <p className="bot_blog_panel-publish_date">
            Published
            {' '}
            {publishDate}
          </p>
          <div className="bot_blog_panel-large-bot_container">
            <div className="blog_bot_panel-icon" style={{ backgroundImage: `url(${botIcon})`, marginLeft: 0 }} />
            <p className="blog_bot_panel-title" style={{ color: 'white' }}>{botName}</p>
          </div>

          <h4 className="blog_bot_panel-title">{title}</h4>
          <div className="blog_bot_panel-divider" />

          <div className="blog_bot_panel-author">
            <div className="blog_bot_panel-author-avatar" style={{ backgroundImage: `url(${authorAvatar})` }} />
            <p className="panel_text-normal-small " style={{ float: 'left', margin: '20px 0px 0px 10px' }}>{authorUsername}</p>
          </div>
        </div>

      </div>
    </a>

  );
}

export default BotBlogPanelLarge;
