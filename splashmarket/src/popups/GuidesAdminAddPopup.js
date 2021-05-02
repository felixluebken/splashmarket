/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './Popups.css';
import { Formik } from 'formik';
import Autocomplete from 'react-autocomplete';
import EmptyFileIcon from '../resources/icons/img-grey.svg';
import { addBotValidationSchema } from '../helpers/validationSchema';
import GuideTag from '../components/small-panels/guideTags';
import GuideService from '../services/GuideService';

function GuidesAdminAddPopup(props) {
  const {
    handleToggleAddBotModal, getGuides, validBots,
  } = props;
  const [imgURL, setImgURL] = useState('');
  const [backendError, setBackendError] = useState(null);

  const initialValues = {
    botName: '',
    tags: [],
    fileContents: '',
    unbindType: '',
    renewalTypes: [{
      price: '',
      renewalType: '',
      renewalInterval: '',
    }],
    systemsSupported: [],
    middleMan: '',
    scammerPrevention: '',
    twitterURL: '',
    instagramURL: '',
  };

  const handleBlur = (validateField) => (event) => {
    validateField(event.target.name);
  };

  const handleSelectionChanged = (name, setFieldValue, value) => {
    setFieldValue(name, value);
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

  const handleKeyPress = (setFieldValue, tagValues) => (e) => {
    // it triggers by pressing the enter key
    if (e.which === 13) {
      const tags = [...tagValues, e.target.value];
      setFieldValue('tags', tags);
      e.target.value = '';
      // handleBotSearch();
    }
  };

  const handleFileInput = (setFieldValue) => (event) => {
    setImgURL(URL.createObjectURL(event.target.files[0]));
    setFieldValue(event.target.name, event.target.files[0]);
  };

  const onBotGuideCreateSuccess = (response) => {
    getGuides();
    handleToggleAddBotModal();
  };
  const onBotGuideCreateError = (error) => {
    setBackendError(error.response.data);
  };

  const handleSubmit = (values, validateForm) => {
    validateForm().then(async (errors) => {
      if (Object.keys(errors).length === 0) {
        setBackendError(null);
        // Create form data and append File + json data
        const formData = new FormData();
        formData.append('document', values.fileContents);
        const stringifiedJSON = JSON.stringify(values);
        formData.append('data', stringifiedJSON);
        await GuideService.CreateBotGuide(formData, onBotGuideCreateSuccess, onBotGuideCreateError);
      }
    });
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
          tags,
        } = values;
        return (
          <div className="popup_panel-small">
            <div className="guides_bot_edit-header">
              <div className={`guides_bot_edit-header_img-frame ${errors.fileContents && 'invalid-input'}`}>
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
              <div style={{ marginLeft: '25px' }}>
                {backendError && (
                  <p className="invalid-text-color">{backendError}</p>
                )}
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
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                    background: '#19192c',
                    border: '1.5px solid #252538',
                    padding: '10px 10px',
                    position: 'fixed',
                    overflow: 'auto',
                    bottom: '10%',
                    top: '100px',
                    left: '0',
                    right: '0',
                    maxHeight: '50%',
                    width: '100%',
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

            <div className="guides_bot_edit-tag_container">
              {values.tags && values.tags.length === 0 ? (
                <>
                  <GuideTag tag="No tags" />
                </>
              ) : (
                <>
                  {values.tags.map((tag) => <GuideTag key={tag} tag={tag} />)}

                </>
              )}

            </div>

            <div className="guides_bot_edit-input_container">

              <p className="popup_text-normal">Add Tags</p>
              <input
                type="text"
                name="tags"
                className={`popup_admin_input ${errors.tags && 'invalid-input'}`}
                placeholder="Insert tag name here..."
                onKeyPress={handleKeyPress(setFieldValue, values.tags)}
                onBlur={handleBlur(validateField)}
              />

            </div>

            <div
              className="guides_bot_edit-button_container"

            >
              <div
                className="popup_red-btn"
                style={{ width: '45%', cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                aria-label="Home page header"
                aria-hidden="true"
                onClick={handleToggleAddBotModal}
              >
                <span
                  className="popup_red-btn_text"
                >
                  Cancel

                </span>
              </div>

              <div
                className="popup_blue-btn"
                style={{ width: '45%', cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                aria-label="Home page header"
                aria-hidden="true"
                onClick={() => {
                  handleSubmit(values, validateForm);
                }}
              >
                <span
                  className="popup_blue-btn_text"

                >
                  Save

                </span>
              </div>
            </div>

          </div>
        );
      }}
    </Formik>

  );
}

export default GuidesAdminAddPopup;
