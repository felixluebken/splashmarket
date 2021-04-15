/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './Popups.css';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as yup from 'yup';
import EmptyFileIcon from '../resources/icons/img-grey.svg';
import DropletService from '../services/DropletService';

const validationSchema = yup.object().shape({
  company: yup.string().required('Company Name is required.'),
  prize: yup.string().required('Prize is required.'),
  price: yup.string().required('Price is required.'),
  companyDescription: yup.string().required('Company Description is required.'),
  prizeDescription: yup.string().required('Prize Description is required.'),
  fileContents: yup.string().required('Company Logo is required.'),
});

const initialValues = {
  company: '',
  prize: '',
  price: '',
  companyDescription: '',
  prizeDescription: '',
  fileContents: '',
};

function DropletsAdminAddPopup(props) {
  const { handleTogglePopup } = props;
  const [imgURL, setImgURL] = useState('');
  const onDropletCreateSuccess = (response) => {
    console.log('RESPONSE: ', response.data);
    handleTogglePopup();
  };
  const onDropletCreateError = (error) => {
    console.log('ERROR: ', error.response);
  };

  const handleSubmit = (values, validateForm) => {
    validateForm().then(async (errors) => {
      if (Object.keys(errors).length === 0) {
        // Create form data and append File + json data
        const formData = new FormData();
        formData.append('document', values.fileContents);
        const stringifiedJSON = JSON.stringify(values);
        formData.append('data', stringifiedJSON);

        await DropletService.CreateDroplet(formData, onDropletCreateSuccess, onDropletCreateError);
      }
    });
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
      validationSchema={validationSchema}
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
        console.log('VALUES: ', values);
        const {
          company, prize, price, companyDescription, prizeDescription, fileContents,
        } = values;
        return (
          <div className="popup_panel-tall">
            <div className="droplets_admin_add-header_container">
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
              <div className="droplets_admin_add-header_text-frame">
                <p className="popup_text-normal-small" style={{ marginBottom: '6px' }}>Company</p>
                <input
                  name="company"
                  className={`popup_admin_input ${errors.company && 'invalid-input'}`}
                  placeholder="Enter company"
                  value={company}
                  onChange={handleChange}
                  onBlur={handleBlur(validateField)}
                />
              </div>

            </div>
            <p className="popup_text-normal-small" style={{ marginBottom: '6px' }}>Prize Name</p>
            <input
              name="prize"
              type="text"
              className={`popup_admin_input ${errors.prize && 'invalid-input'}`}
              placeholder="Enter prize"
              style={{ marginBottom: '10px' }}
              value={prize}
              onChange={handleChange}
              onBlur={handleBlur(validateField)}
            />

            <p className="popup_text-normal-small" style={{ marginBottom: '6px' }}>Droplet Amount</p>
            <input
              name="price"
              tyle="number"
              className={`popup_admin_input ${errors.price && 'invalid-input'}`}
              placeholder="Enter amount"
              style={{ marginBottom: '10px' }}
              value={price}
              onChange={handleChange}
              onBlur={handleBlur(validateField)}
            />

            <p className="popup_text-normal-small" style={{ marginBottom: '6px' }}>Company Description</p>
            <textarea
              name="companyDescription"
              className={`popup_admin_text-area ${errors.companyDescription && 'invalid-input'}`}
              placeholder="Enter text here"
              style={{ marginBottom: '10px' }}
              value={companyDescription}
              onChange={handleChange}
              onBlur={handleBlur(validateField)}
            />

            <p className="popup_text-normal-small" style={{ marginBottom: '6px' }}>Prize Description</p>
            <textarea
              name="prizeDescription"
              className={`popup_admin_text-area ${errors.prizeDescription && 'invalid-input'}`}
              placeholder="Enter text here"
              style={{ marginBottom: '10px' }}
              value={prizeDescription}
              onChange={handleChange}
              onBlur={handleBlur(validateField)}
            />

            <div className="droplets_admin_add-btn_container">
              <div
                className="popup_red-btn"
                style={{ width: '45%', cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                aria-label="Home page header"
                aria-hidden="true"
                onClick={() => {
                  handleTogglePopup();
                }}
              >
                <span className="popup_red-btn_text">Cancel</span>
              </div>
              <div
                className="popup_blue-btn"
                style={{ width: '45%' }}
                role="button"
                tabIndex={0}
                aria-label="Home page header"
                aria-hidden="true"
                onClick={() => {
                  handleSubmit(values, validateForm);
                }}
              >
                <span className="popup_blue-btn_text">Save</span>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>

  );
}

export default DropletsAdminAddPopup;
