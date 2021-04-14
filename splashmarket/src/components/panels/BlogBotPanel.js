import React from 'react';
import './panels.css';

function BlogBotPanel(props) {
  const {
    publishDate, blogUrl, authorAvatar, authorUsername, headerTitle, headerTextColor, headerIcon, headerColor, bodyContent,
  } = props;
  return (
    <div className="blog_bot_panel">
      <div className="blog_bot_panel-header" style={{ backgroundColor: `${headerColor}` }}>
        <div className="blog_bot_panel-header-icon" style={{ backgroundImage: `${headerIcon}` }} />
        <h2 className="blog_bot_panel-header-title" style={{ color: `${headerTextColor}` }}>{headerTitle}</h2>
      </div>
      <div className="blog_bot_panel-body">
        <p className="panel_text-normal" style={{ height: '50px', overflowY: 'hidden' }}>{bodyContent}</p>
        <div className="blog_bot_panel-divider" />
        <p className="panel_text-light-small" style={{ width: '180px', overflow: 'hidden' }}>
          Published
          {publishDate}
        </p>
        <div className="blog_bot_panel-author">
          <div className="blog_bot_panel-author-avatar" style={{ backgroundImage: `url(${authorAvatar})` }} />
          <p className="panel_text-normal-small" style={{ float: 'left', margin: '16px 0px 0px 10px' }}>{authorUsername}</p>
          <a href={blogUrl}>
            <div className="blue_button-read_blog">
              <span className="blue_button-read_blog-text">Read Blog</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default BlogBotPanel;
