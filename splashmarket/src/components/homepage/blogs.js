<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import './homepage.css'

import BlogBotPanel from '../panels/BlogBotPanel' 


function HomepageBlogs() {
    return(
        <div className="section_blogs">
            <div className="blogs_text">
                <span className="section_title-blue">Member Leaderboard</span>
                <span className="section_title-big">View the members with the most transactions</span>
            </div>
            <div className="blogs_img">
                <BlogBotPanel   headerColor="#52FF81"
                                headerTextColor="#131323"
                                headerTitle="Cyber"
                                headerIcon="icon_url_here"
                                bodyContent="How well did Cybersole perform on the University Blue drop?"
                                publishDate="December 24, 2020"
                                authorAvatar="https://cdn.discordapp.com/avatars/638784999293976635/06d1e75f49559a1b16e6d127ec1c4fbf.jpg"
                                authorUsername="dearchitect#7336"
                                blogUrl="https://google.com"
                />
                <BlogBotPanel   headerColor="#52FF81"
                                headerTextColor="#131323"
                                headerTitle="Cyber"
                                headerIcon="icon_url_here"
                                bodyContent="How well did Cybersole perform on the University Blue drop?"
                                publishDate="December 24, 2020"
                                authorAvatar="https://cdn.discordapp.com/avatars/638784999293976635/06d1e75f49559a1b16e6d127ec1c4fbf.jpg"
                                authorUsername="dearchitect#7336"
                                blogUrl="https://google.com"
                />
                <BlogBotPanel   headerColor="#52FF81"
                                headerTextColor="#131323"
                                headerTitle="Cyber"
                                headerIcon="icon_url_here"
                                bodyContent="How well did Cybersole perform on the University Blue drop?"
                                publishDate="December 24, 2020"
                                authorAvatar="https://cdn.discordapp.com/avatars/638784999293976635/06d1e75f49559a1b16e6d127ec1c4fbf.jpg"
                                authorUsername="dearchitect#7336"
                                blogUrl="https://google.com"
                />
            </div>
            <div className="blog_link-container">
                <a className="blog_link">View all blogs ⇾</a>
            </div>
=======
=======
>>>>>>> 15ebc17... Finishing oauth login flow
import React from 'react';
import './homepage.css';
import BlogBotPanel from '../panels/BlogBotPanel';

function HomepageBlogs() {
=======
import React from 'react';
import './homepage.css';

function HomepageBlogs() {
>>>>>>> c9b84a3... Added eslint and router
  return (
    <div className="section_blogs">
      <div className="blogs_text">
        <span className="section_title-blue">Member Leaderboard</span>
        <span className="section_title-big">View the members with the most transactions</span>
      </div>
      <div className="blogs_img">
<<<<<<< HEAD
        <BlogBotPanel
          headerColor="#52FF81"
          headerTextColor="#131323"
          headerTitle="Cyber"
          headerIcon="icon_url_here"
          bodyContent="How well did Cybersole perform on the University Blue drop?"
          publishDate="December 24, 2020"
          authorAvatar="https://cdn.discordapp.com/avatars/638784999293976635/06d1e75f49559a1b16e6d127ec1c4fbf.jpg"
          authorUsername="dearchitect#7336"
          blogUrl="https://google.com"
        />
=======
        <div className="blog_panel blog-dashe" />
        <div className="blog_panel blog-cyber" />
        <div className="blog_panel blog-pd" />
>>>>>>> c9b84a3... Added eslint and router
      </div>
      <div className="blog_link-container">
        <a className="blog_link">View all blogs ⇾</a>
      </div>

    </div>
  );
}

export default HomepageBlogs;
