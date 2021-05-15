/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useContext } from 'react';
import {
  Formik,
} from 'formik';
import './Popups.css';
import Autocomplete from 'react-autocomplete';
import { blogValidationSchema } from '../helpers/validationSchema';
import BotService from '../services/BotService';
import EmptyFileIcon from '../resources/icons/img-grey.svg';
import BlogService from '../services/BlogService';
import { UserContext } from '../context/UserContext';

const BlogsEditPopup = (props) => {
  const { handleToggleAddBlogModal } = props;
  const [user] = useContext(UserContext);
  const [imgURL, setImgURL] = useState('');
  const [validBots, setValidBots] = useState([]);

  const handleFileInput = (setFieldValue) => (event) => {
    setImgURL(URL.createObjectURL(event.target.files[0]));
    setFieldValue(event.target.name, event.target.files[0]);
  };

  const initialValues = {
    fileContents: {},
    botName: '',
    imageURL: '',
    headerColor: '',
    title: '',
    body: '',
    author: user ? `${user.username}#${user.discriminator}` : '',
    authorAvatar: user.avatar ? user.avatar : '',
  };

  const sortBots = (a, b, value) => {
    const aLower = a.displayName.toLowerCase();
    const bLower = b.displayName.toLowerCase();
    const valueLower = value.toLowerCase();
    const queryPosA = aLower.indexOf(valueLower);
    const queryPosB = bLower.indexOf(valueLower);
    if (queryPosA !== queryPosB) {
      return queryPosA - queryPosB;
    }
    return aLower < bLower ? -1 : 1;
  };

  const getValidBots = async () => {
    const onGetValidBotsSuccess = (response) => {
      setValidBots(response.data);
    };
    const onGetValidBotsError = (error) => {
      console.log('ON GET VALID BOTS ERROR: ', error.response);
    };

    await BotService.GetAllBots(onGetValidBotsSuccess, onGetValidBotsError);
  };

  useEffect(() => {
    getValidBots();
  }, []);

  const onCreateBlogSuccess = (response) => {
    console.log('RESPONSE: ', response.data);
    handleToggleAddBlogModal();
  };
  const onCreateBlogError = (error) => {
    console.log('ERROR: ', error.response);
  };

  console.log('USER: ', user);

  const handleSubmit = (values, validateForm) => {
    validateForm().then(async (errors) => {
      if (Object.keys(errors).length === 0) {
        // Create form data and append File + json data
        const formData = new FormData();
        formData.append('document', values.fileContents);
        const stringifiedJSON = JSON.stringify(values);
        formData.append('data', stringifiedJSON);

        await BlogService.CreateBlog(formData, onCreateBlogSuccess, onCreateBlogError);
      }
    });
  };

  const handleBlur = (validateField) => (event) => {
    validateField(event.target.name);
  };

  const handleSelectionChanged = (name, setFieldValue, value) => {
    setFieldValue(name, value);
  };

  return (
    <Formik
      validationSchema={blogValidationSchema}
      onSubmit={(event) => {
        event.preventDefault();
      }}
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={initialValues}
    >
      {({
        errors,
        handleChange,
        values,
        validateField,
        validateForm,
        setFieldValue,
      }) => {
        const {
          fileContents, botName, imageURL, headerColor, title, body,
        } = values;
        console.log('VALUES: ', values);
        return (
          <div className="popup_panel-big">
            <div className="blogs_edit-main">
              <div className="blogs_edit-details">
                <div className="blogs_edit-header">
                  <div className="blogs_edit-header_img-frame">
                    {/* <div className="blogs_edit-header_img" /> */}
                    <div className={`droplets_admin_add-header_img-frame ${errors.fileContents && 'invalid-input'}`}>
                      <label
                        htmlFor="droplet-file"
                        className="droplets_admin_add-header_img"
                        style={{
                          backgroundImage: imgURL ? `url(${imgURL})` : `url${EmptyFileIcon}`,
                        }}
                      />
                      <input
                        name="fileContents"
                        type="file"
                        onChange={handleFileInput(setFieldValue)}
                        onBlur={handleBlur(validateField)}
                        hidden
                        id="droplet-file"
                      />

                    </div>
                  </div>

                  <div style={{ marginLeft: '20px', width: '70%' }}>
                    <p className="popup_text-normal" style={{ margin: '0px 0px 5px 0px' }}>Bot Name</p>
                    <Autocomplete
                      style={{ border: '1px solid red' }}
                      sortItems={validBots.length > 0 && sortBots}
                      inputProps={{
                        name: 'botName',
                        placeholder: 'Search Bot',
                        className: `${errors.botName && 'invalid-input'}`,
                        style: {
                          fontFamily: 'Poppins',
                          fontSize: '17px',
                          lineHeight: '18px',
                          border: '1.5px solid #252538',
                          width: '100%',
                        },
                      }}
                      shouldItemRender={(item, value) => item.displayName.toLowerCase().indexOf(value.toLowerCase()) > -1}
                      wrapperStyle={{
                      }}
                      menuStyle={{
                        borderRadius: '3px',
                        inset: '105px 25% 10% 16%',
                        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                        background: '#19192c',
                        border: '1.5px solid #252538',
                        padding: '10px 10px',
                        position: 'absolute',
                        overflow: 'auto',
                        bottom: '10%',
                        top: '100px',
                        right: '25%',
                        maxHeight: '50%',
                        width: '50%',
                      }}
                      getItemValue={(item) => item.displayName}
                      items={validBots}
                      renderItem={(item) => (
                        <div
                          key={item.id}
                          style={{
                            background: '#19192c',
                            border: '1.5px solid #252538',
                            color: 'white',
                            fontFamily: 'Poppins',
                            fontSize: '18px',
                            lineHeight: '18px',
                            cursor: 'pointer',
                          }}
                        >
                          <span>
                            {item.displayName}
                          </span>
                        </div>
                      )}
                      renderMenuItemChildren={(option) => (
                        <div key={option.id}>
                          <span style={{ fontSize: '20px' }}>{option.displayName}</span>
                        </div>
                      )}
                      onSelect={(value) => {
                        handleSelectionChanged('botName', setFieldValue, value);
                      }}
                      value={values.botName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div style={{ width: '100%', display: 'inline-block' }}>
                  <p className="popup_text-normal" style={{ margin: '0px 0px 5px 0px' }}>Image URL</p>
                  <input
                    name="imageURL"
                    type="text"
                    className={`popup_admin_input ${errors.imageURL && 'invalid-input'}`}
                    placeholder="Enter image URL"
                    onChange={handleChange}
                    onBlur={handleBlur(validateField)}
                  />
                </div>

                <div style={{ width: '100%', marginTop: '20px', display: 'inline-block' }}>
                  <p className="popup_text-normal" style={{ margin: '0px 0px 5px 0px' }}>Header Color</p>
                  <input
                    name="headerColor"
                    type="text"
                    className={`popup_admin_input ${errors.headerColor && 'invalid-input'}`}
                    placeholder="#03F045"
                    onChange={handleChange}
                    onBlur={handleBlur(validateField)}
                  />
                </div>
              </div>
              <div className="blogs_edit-body">

                <div className="blogs_edit-header">
                  <div style={{ width: '100%' }}>
                    <p className="popup_text-normal" style={{ margin: '0px 0px 5px 0px' }}>Title</p>
                    <input
                      name="title"
                      type="text"
                      className={`popup_admin_input ${errors.title && 'invalid-input'}`}
                      placeholder="Enter title"
                      onChange={handleChange}
                      onBlur={handleBlur(validateField)}
                    />
                  </div>
                </div>
                <p className="popup_text-normal" style={{ margin: '0px 0px 5px 0px' }}>Body</p>
                <textarea
                  name="body"
                  className={`popup_blog_text-area ${errors.body && 'invalid-input'}`}
                  placeholder="Type your blog here"
                  onChange={handleChange}
                  onBlur={handleBlur(validateField)}
                />
              </div>
            </div>
            <div className="blogs_edit-buttons">
              <div
                className="popup_red-btn"
                role="button"
                tabIndex={0}
                aria-label="Home page header"
                aria-hidden="true"
                onClick={() => {
                  handleToggleAddBlogModal();
                }}
              >
                <span className="popup_red-btn_text">Cancel</span>
              </div>
              <div
                className="popup_blue-btn"
                role="button"
                tabIndex={0}
                aria-label="Home page header"
                aria-hidden="true"
                onClick={() => {
                  handleSubmit(values, validateForm);
                }}
              >
                <span className="popup_blue-btn_text">Add Blog</span>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>

  );
};

export default BlogsEditPopup;
