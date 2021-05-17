import React from 'react';
import { useHistory } from 'react-router-dom';
import './panels.css';

function BlogBotPanel(props) {
  const {
    publishDate, blogUrl, authorAvatar, authorUsername, headerTitle, headerTextColor, headerIcon, headerColor, bodyContent, id,
  } = props;

  const history = useHistory();
  const handleRedirect = (route) => {
    history.push(route);
  };
  return (
    <div
      className="blog_bot_panel"
      role="button"
      tabIndex={0}
      aria-label="Home page header"
      aria-hidden="true"
      style={{ cursor: 'pointer' }}
      onClick={() => {
        handleRedirect(`/blogs/${id}`);
      }}
    >
      <div className="blog_bot_panel-header" style={{ backgroundColor: `${headerColor}` }}>
        <div className="blog_bot_panel-header-icon" style={{ backgroundImage: `url(${headerIcon})` }} />
        <h2 className="blog_bot_panel-header-title" style={{ color: `${headerTextColor}` }}>{headerTitle}</h2>
      </div>
      <div className="blog_bot_panel-body">
        <p className="panel_text-normal" style={{ height: '50px', overflowY: 'hidden' }}>{bodyContent}</p>
        <div className="blog_bot_panel-divider" />
        <p className="panel_text-light-small" style={{ width: '180px', overflow: 'hidden' }}>
          {`Published ${publishDate}`}
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
