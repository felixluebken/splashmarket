import React, { useState, useEffect } from 'react';
import './Blogs.css';
import { useParams, useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import moment from 'moment';
import HeaderBlogs from '../components/header/headerBlogs';
import Footer from '../components/footer/footer';
import BotBlogPanelExpand from '../components/panels/BlogBotPanelExpand';
import BlogService from '../services/BlogService';

const BlogsExpand = () => {
  const history = useHistory();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getBlog = () => {
    const onGetBlogsSuccess = (response) => {
      if (response.data) {
        setBlog(response.data);
        setIsLoading(false);
      }
    };
    const onGetBlogsError = (error) => {
      console.log('ERROR: ', error.response);
      history.push('/blogs');
      setIsLoading(false);
    };
    BlogService.GetBlog(id, onGetBlogsSuccess, onGetBlogsError);
  };

  useEffect(() => {
    if (id) {
      getBlog();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="loading-icon-container" style={{ height: '100%' }}>
        <Loader
          type="Puff"
          color="#00BFFF"
          height={200}
          width={100}
          timeout={15000}
        />
      </div>
    );
  }

  return (
    <>
      <HeaderBlogs />
      <div className="blogs_panel-container">
        <BotBlogPanelExpand botName={blog.botName} publishDate={moment(blog.createdAt).format('MMMM DD, YYYY')} authorUsername={blog.author} authorAvatar={blog.authorAvatar} imageUrl={blog.imageURL} title={blog.title} fileContents={blog.fileContents} />
        <h5 className="bots_expand-title">{blog.title}</h5>
        <p className="bots_expand-text">
          {blog.body}
        </p>
      </div>
      <Footer />
    </>
  );
};

export default BlogsExpand;
