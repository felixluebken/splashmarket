import React from 'react';
import './homepage.css';

function HomepageBlogs() {
  return (
    <div className="section_blogs">
      <div className="blogs_text">
        <span className="section_title-blue">Member Leaderboard</span>
        <span className="section_title-big">View the members with the most transactions</span>
      </div>
      <div className="blogs_img">
        <div className="blog_panel blog-dashe" />
        <div className="blog_panel blog-cyber" />
        <div className="blog_panel blog-pd" />
      </div>
      <div className="blog_link-container">
        <a className="blog_link">View all blogs ⇾</a>
      </div>

    </div>
  );
}

export default HomepageBlogs;
