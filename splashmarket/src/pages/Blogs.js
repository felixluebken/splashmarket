/* eslint-disable no-underscore-dangle */
import React, { useContext, useState, useEffect } from 'react';
import './Blogs.css';

import moment from 'moment';
import HeaderBlogs from '../components/header/headerBlogs';
import Footer from '../components/footer/footer';

import BotBlogPanelLarge from '../components/panels/BlogBotPanelLarge'; // use for new blog posts
import BotBlogPanelSmall from '../components/panels/BlogBotPanelSmall';
import PageSwitch from '../components/page-switch/PageSwitch';
import { UserContext } from '../context/UserContext';
import BlogsEditPopup from '../popups/BlogsEditPopup';
import BlogService from '../services/BlogService';
import useQuery from '../helpers/useQuery';

const Blogs = () => {
  const [user] = useContext(UserContext);
  const [isAddBlogModalVisible, setIsAddBlogModalVisible] = useState(false);
  const [blogs, setBlogs] = useState(null);
  const [newBlogPost, setNewBlogPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageQuery = useQuery().get('page') || 1;
  const [pager, setPager] = useState({
    totalPages: 0,
    totalItems: 0,
  });
  const { role = 'member' } = user;

  const handleToggleAddBlogModal = () => {
    setIsAddBlogModalVisible(!isAddBlogModalVisible);
  };

  const getBlogs = () => {
    const onGetBlogsSuccess = (response) => {
      if (response.data.pager) {
        setPager(response.data.pager);
        setCurrentPage(response.data.pager.currentPage);
      }
      if (response.data.pageOfItems && response.data.pageOfItems.length > 0) {
        const blogsRetrieved = [...response.data.pageOfItems];
        setNewBlogPost(blogsRetrieved.shift());
        setBlogs(blogsRetrieved);
      } else {
        setBlogs(response.data.pageOfItems);
      }
    };
    const onGetBlogsError = (error) => {
      console.log('ERROR: ', error.response);
    };
    BlogService.GetBlogs(pageQuery, onGetBlogsSuccess, onGetBlogsError);
  };

  const handleDeleteBlog = (id) => {
    const onDeleteBlogSuccess = () => {
      getBlogs();
    };

    const onDeleteBlogError = (error) => {
      console.log('ERROR GETTING DROPLETS: ', error.response);
    };

    BlogService.DeleteBlog(id, onDeleteBlogSuccess, onDeleteBlogError);
  };

  useEffect(() => {
    getBlogs();
  }, [pageQuery]);

  return (
    <>
      {isAddBlogModalVisible && (
      <BlogsEditPopup handleToggleAddBlogModal={handleToggleAddBlogModal} />
      )}
      <HeaderBlogs />
      <div className="blogs_panel-container">
        {user && role === 'admin' && (
        <div className="guides_admin-button-container" style={{ width: '75%', margin: '10px 10%' }}>
          <div
            className="guides_admin-add_button"
            role="button"
            tabIndex={0}
            aria-label="Home page header"
            aria-hidden="true"
            style={{ cursor: 'pointer' }}
            onClick={handleToggleAddBlogModal}
          >
            <span
              className="guides_admin-button_text"
            >
              Add Blog
            </span>
          </div>
        </div>
        )}
        {newBlogPost && (
        <BotBlogPanelLarge botName={newBlogPost.botName} authorUsername={newBlogPost.author} authorAvatar={newBlogPost.authorAvatar} title={newBlogPost.title} publishDate={moment(newBlogPost.createdAt).format('MMMM DD, YYYY')} imageUrl={newBlogPost.imageURL} fileContents={newBlogPost.fileContents} isNewPost={pageQuery === '1'} id={newBlogPost._id} />
        )}

        {blogs && blogs.length > 0 && blogs.map((blog) => {
          const {
            _id, botName, author, authorAvatar, title, fileContents, headerColor,
          } = blog;
          let img;
          let imgURL;
          if (fileContents && fileContents.buffer) {
            // eslint-disable-next-line new-cap
            img = new Buffer.from(fileContents.buffer).toString('base64');
            imgURL = `data:image/png;base64,${img}`;
          }
          return (
            <BotBlogPanelSmall headerColor={headerColor} headerTextColor="black" headerTitle={botName} authorUsername={author} authorAvatar={authorAvatar} bodyTitle={title} publishDate={moment(newBlogPost.createdAt).format('MMMM DD, YYYY')} headerIcon={imgURL || ''} canBeDeleted={user.role === 'admin'} id={_id} handleDeleteBlog={handleDeleteBlog} />
          );
        })}
      </div>
      <PageSwitch totalPages={(pager && pager.totalPages) || 1} currentPage={(pager && currentPage) || 1} />
      <Footer />
    </>
  );
};

export default Blogs;
