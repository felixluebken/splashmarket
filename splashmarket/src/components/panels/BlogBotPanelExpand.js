/* eslint-disable new-cap */
import React, { useState, useEffect } from 'react';
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
    imageUrl, headerIcon, publishDate, botName, title, authorAvatar, authorUsername, fileContents,
  } = props;

  const [botIcon, setBotIcon] = useState(null);

  useEffect(() => {
    if (fileContents.buffer) {
      const img = new Buffer.from(fileContents.buffer).toString('base64');
      setBotIcon(`data:image/png;base64,${img}`);
    }
  }, [fileContents]);

  return (
    <div className="bot_blog_panel-expand">

      <div className="bot_blog_panel-expand-img" style={{ backgroundImage: `url(${imageUrl})` }} />

      <div className="bot_blog_panel-expand-content">
        <p className="bot_blog_panel-publish_date">
          Published
          {' '}
          {publishDate}
        </p>
        <div className="bot_blog_panel-large-bot_container">
          <div className="blog_bot_panel-icon" style={{ backgroundImage: `url(${botIcon})`, marginLeft: 0 }} />
          <p className="blog_bot_panel-title" style={{ color: 'white' }}>{botName}</p>
        </div>

        <h4 className="blog_bot_panel-expand-title">{title}</h4>
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
