import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './homepage.css';
import moment from 'moment';
import BlogBotPanel from '../panels/BlogBotPanel';
import BlogService from '../../services/BlogService';

const HomepageBlogs = () => {
  const [blogs, setBlogs] = useState(null);
  const history = useHistory();
  const handleRedirect = (route) => {
    history.push(route);
  };

  const getBlogs = () => {
    const onGetBlogsSuccess = (response) => {
      if (response.data.pageOfItems && response.data.pageOfItems.length > 0) {
        setBlogs(response.data.pageOfItems);
      } else {
        setBlogs(response.data.pageOfItems);
      }
    };
    const onGetBlogsError = (error) => {
      console.log('ERROR: ', error.response);
    };
    BlogService.GetBlogs(1, onGetBlogsSuccess, onGetBlogsError);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="section_blogs">
      <div className="blogs_text">
        <span className="section_title-blue">Blogs</span>
        <span className="section_title-big">Catch up on the latest bot related news</span>
      </div>
      <div className="blogs_img">
        {blogs && blogs.length && blogs.map((blog) => {
          const {
            headerColor, _id, fileContents, botName, imageURL, title, createdAt, author, authorAvatar,
          } = blog;
          return (
            <BlogBotPanel
              headerColor={headerColor}
              headerTitle={botName}
              headerIcon={imageURL}
              bodyContent={title}
              publishDate={moment(createdAt).format('MMMM DD, YYYY')}
              authorAvatar={authorAvatar}
              authorUsername={author}
              id={_id}
            />
          );
        })}

      </div>
      <div
        className="blog_link-container"
        role="button"
        tabIndex={0}
        aria-label="Home page header"
        aria-hidden="true"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          handleRedirect('/blogs');
        }}
      >
        <a className="blog_link">View all blogs ⇾</a>
      </div>
    </div>
  );
};

export default HomepageBlogs;
