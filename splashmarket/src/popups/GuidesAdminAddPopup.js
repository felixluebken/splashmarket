/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import './Popups.css';
import { Formik } from 'formik';
import Autocomplete from 'react-autocomplete';
import EmptyFileIcon from '../resources/icons/img-grey.svg';
import { addBotValidationSchema } from '../helpers/validationSchema';

import GuideTag from '../components/small-panels/guideTags';
import BotService from '../services/BotService';

function GuidesAdminAddPopup(props) {
  const { handleToggleAddBotModal } = props;
  const [imgURL, setImgURL] = useState('');

  const [validBots, setValidBots] = useState([]);

  const getValidBots = async () => {
    const onGetValidBotsSuccess = (response) => {
      console.log('RESPONSE: ', response.data);
      setValidBots(response.data);
    };
    const onGetValidBotsError = (error) => {
      console.log('ON GET VALID BOTS ERROR: ', error.response);
    };

    await BotService.GetAllBots(onGetValidBotsSuccess, onGetValidBotsError);
  };
  console.log('VALID BOTS: ', validBots);

  useEffect(() => {
    getValidBots();
  }, []);

  const initialValues = {
    botName: '',
    tags: [],
    fileContents: '',
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
        console.log('TAGS: ', tags);
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
                <p className="popup_text-normal" style={{ margin: '0px 0px 5px 0px' }}>Bot Name</p>
                {/* <select
                  className="guides_filter"
                  style={{ width: '100%', border: '1.5px solid #252538' }}
                >
                  <option value="">Select Bot Name</option>
                  {validBots && validBots.map((bot) => {
                    console.log('BOT: ', validBots[bot]);
                    return (
                      <option value={bot} label={bot.displayName} />
                    );
                  })}

                </select> */}
                <Autocomplete
                  style={{ border: '1px solid red' }}
                  sortItems={validBots.length > 0 && sortBots}
                  inputProps={{
                    name: 'botName',
                    placeholder: 'Search Bot',
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

              <p className="popup_text-normal">Add Tag</p>
              <input
                type="text"
                className="popup_admin_input"
                placeholder="Insert tag name here..."
                onKeyPress={handleKeyPress(setFieldValue, values.tags)}
              />

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
