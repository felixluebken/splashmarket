import React from 'react';
import './panels.css';

/*
headerColor         -str
headerIcon          -str
headerTextColor     -str

publishDate         -str
headerTitle         -str

bodyTitle           -str
bodyContent         -str

authorAvatar        -str
authorUsername      -str

blogUrl             -str

*/

function BlogBotPanelSmall(props) {
  const {
    blogUrl, headerColor, headerIcon, headerTextColor, headerTitle, publishDate, bodyTitle, bodyContent, authorAvatar, authorUsername, canBeDeleted, id, handleDeleteBlog,
  } = props;

  return (
    <a href={blogUrl}>
      <div className="bot_blog_panel-small">
        <div
          className="blog_bot_panel-header"
          style={{
            backgroundColor: `${headerColor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}
        >
          <div style={{ height: '100%' }}>
            <div className="blog_bot_panel-header-icon" style={{ backgroundImage: `url(${headerIcon})` }} />
            <h2 className="blog_bot_panel-header-title" style={{ color: `${headerTextColor}` }}>{headerTitle}</h2>
          </div>

          {canBeDeleted && (
          <div
            name="delete"
            id="delete"
            className="guides_panel_admin-delete_btn"
            role="button"
            tabIndex={0}
            aria-label="Home page header"
            aria-hidden="true"
            style={{ marginLeft: '0', marginRight: '25px' }}
            onClick={() => {
              handleDeleteBlog(id);
            }}
          />
          )}
        </div>
        <div className="blog_bot_panel-body">
          <p className="panel_text-light-small" style={{ width: '220px', overflow: 'hidden', marginBottom: '5px' }}>
            Published
            {' '}
            {publishDate}
          </p>
          <h6 className="blog_bot_panel-title">{bodyTitle}</h6>
          <p className="blog_bot_panel-content" style={{ width: '100%', overflow: 'hidden', marginTop: '5px' }}>{bodyContent}</p>
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

export default BlogBotPanelSmall;
