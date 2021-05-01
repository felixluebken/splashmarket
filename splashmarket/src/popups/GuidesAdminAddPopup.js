import React, { useState } from 'react';
import './Popups.css';
import { Formik } from 'formik';
import EmptyFileIcon from '../resources/icons/img-grey.svg';
import { addBotValidationSchema } from '../helpers/validationSchema';

import GuideTag from '../components/small-panels/guideTags';

function GuidesAdminAddPopup(props) {
  const { handleToggleAddBotModal } = props;
  const [imgURL, setImgURL] = useState('');

  const initialValues = {
    botName: '',
    tags: [],
    fileContents: '',
  };

  const handleBlur = (validateField) => (event) => {
    validateField(event.target.name);
  };

  const handleFileInput = (setFieldValue) => (event) => {
    setImgURL(URL.createObjectURL(event.target.files[0]));
    setFieldValue(event.target.name, event.target.files[0]);
  };

  return (
    <Formik
      validationSchema={addBotValidationSchema}
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
          botName, tags, fileContents,
        } = values;
        return (
          <div className="popup_panel-small">
            <div className="guides_bot_edit-header">
              <div className="guides_bot_edit-header_img-frame">
                <div className="guides_bot_edit-header_img" />
              </div>
              <div style={{ marginLeft: '25px' }}>
                <p className="popup_text-normal" style={{ margin: '0px 0px 5px 0px' }}>Bot Name</p>
                <input type="text" className="popup_admin_input" placeholder="Enter Bot Name" />
              </div>
            </div>

            <div className="guides_bot_edit-tag_container">
              <GuideTag tag="test" />
              <GuideTag tag="test" />
              <GuideTag tag="test" />
              <GuideTag tag="test" />
              <GuideTag tag="test" />
              <GuideTag tag="test" />
              <GuideTag tag="test" />
              <GuideTag tag="test" />
              <GuideTag tag="test" />
              <GuideTag tag="test" />
            </div>

            <div className="guides_bot_edit-input_container">

              <p className="popup_text-normal">Add Tag</p>
              <input type="text" className="popup_admin_input" placeholder="Insert tag name here..." />

            </div>

            <div
              className="guides_bot_edit-button_container"
              role="button"
              tabIndex={0}
              aria-label="Home page header"
              aria-hidden="true"
              style={{ cursor: 'pointer' }}
              onClick={handleToggleAddBotModal}
            >
              <div className="popup_red-btn" style={{ width: '45%' }}>
                <span
                  className="popup_red-btn_text"
                >
                  Cancel

                </span>
              </div>

              <div className="popup_blue-btn" style={{ width: '45%' }}>
                <span className="popup_blue-btn_text">Save</span>
              </div>
            </div>

          </div>
        );
      }}
    </Formik>

  );
}

export default GuidesAdminAddPopup;
