/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import './Popups.css';
import {
  Formik,
} from 'formik';
import ToggleButton from 'react-toggle-button';
import GuideTagLarge from '../components/small-panels/guideTagsLarge';
import { adminBotValidationSchema } from '../helpers/validationSchema';
import selectOptions from '../helpers/selectOptions';
import BotService from '../services/BotService';

const GuidesValidBotAdminEditPopup = (props) => {
  const {
    toggleModal, bot, setBot, getBots,
  } = props;

  let initialValues = {
    id: '',
    botName: '',
    iconUrl: '',
    renewalTypes: [],
    values: '',
    isVisibleOnGraphs: false,
  };

  useEffect(() => () => {
    setBot(null);
  }, []);

  if (bot) {
    initialValues = {
      id: bot._id,
      botName: bot.displayName,
      iconUrl: bot.logo,
      renewalTypes: bot.validRenewalTypes,
      values: bot.values,
      isVisibleOnGraphs: bot.isVisibleOnGraphs,
    };
  }

  const onBotCreateSuccess = () => {
    getBots();
    toggleModal();
  };

  const onBotCreateError = (error) => {
    console.log('ERROR: ', error);
  };

  const onBotUpdateSuccess = () => {
    getBots();
    toggleModal();
  };

  const onBotUpdateError = (error) => {
    console.log('ERROR: ', error);
  };

  const handleSubmit = (values, validateForm) => {
    validateForm().then(async (errors) => {
      if (Object.keys(errors).length === 0) {
        const data = {
          displayName: values.botName,
          logo: values.iconUrl,
          validRenewalTypes: values.renewalTypes,
          values: values.values,
          isVisibleOnGraphs: values.isVisibleOnGraphs,
        };
        if (bot) {
          // Edit
          await BotService.EditAdminBot(values.id, data, onBotUpdateSuccess, onBotUpdateError);
        } else {
          await BotService.CreateAdminBot(data, onBotCreateSuccess, onBotCreateError);
        }
      }
    });
  };

  const disableSpacebar = (event) => {
    const key = event.keyCode;
    // space pressed
    if (key === 32) { // space
      event.preventDefault();
    }
  };

  const handleBlur = (validateField) => (event) => {
    validateField(event.target.name);
  };

  const handleKeyPress = (setFieldValue, botValues) => (e) => {
    // it triggers by pressing the enter key
    if (e.which === 13) {
      const copiedBotValues = [...botValues, e.target.value];
      setFieldValue('values', copiedBotValues);
      e.target.value = '';
      // handleBotSearch();
    }
  };

  const handleRemoveTag = (values, tagToRemove, setFieldValue) => {
    const newBotValues = [...values];

    const foundBotValue = newBotValues.findIndex((tag) => tagToRemove === tag);
    if (foundBotValue > -1) {
      newBotValues.splice(foundBotValue, 1);
      setFieldValue('values', newBotValues);
    }
  };

  const handleRemoveRenewalType = (values, tagToRemove, setValues) => {
    const newRenewalTypes = [...values.renewalTypes];
    const foundTag = newRenewalTypes.findIndex((tag) => {
      if (tag.renewalType === tagToRemove.renewalType && tag.renewalInterval === tagToRemove.renewalInterval && tag.price === tagToRemove.price) {
        return tag;
      }
      return null;
    });
    if (foundTag > -1) {
      newRenewalTypes.splice(foundTag, 1);
      setValues({
        ...values,
        renewalTypes: newRenewalTypes,
        renewalType: '',
      });
    }
  };

  const handleAddRenewalType = (values, setFieldValue) => {
    const copiedRenewalTypes = [...values.renewalTypes, values.renewalType];
    setFieldValue('renewalTypes', copiedRenewalTypes);
    setFieldValue('renewalType', '');
  };

  return (
    <Formik
      validationSchema={adminBotValidationSchema}
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
        setValues,
      }) => {
        const {
          unbindType, siteURL, renewalType, botName, iconUrl, systemsSupported, middleman, scammerPrevention, twitterURL, instagramURL, gracePeriod,
        } = values;

        return (
          <div className="popup_panel-big">
            <div
              className="popup_bot_guides-input-container_half"
              style={{ marginRight: '20px' }}
            >
              <p className="popup_text-large-light">Bot Name</p>
              <input
                type="text"
                name="botName"
                className={`popup_admin_input ${errors.botName && 'invalid-input'}`}
                placeholder="Bot Name"
                onChange={handleChange}
                onBlur={handleBlur(validateField)}
                value={botName}
              />
            </div>
            <div className="popup_bot_guides-input-container_half">
              <p className="popup_text-large-light">Bot Logo</p>
              <input
                type="text"
                name="iconUrl"
                className={`popup_admin_input ${errors.iconUrl && 'invalid-input'}`}
                placeholder="Bot Name"
                onChange={handleChange}
                onBlur={handleBlur(validateField)}
                value={iconUrl}
              />
            </div>
            <p className="popup_text-large-light">Show on Public Bot Graphs</p>
            <ToggleButton
              inactiveLabel="Show"
              activeLabel="Hide"
              value={values.isVisibleOnGraphs}
              onToggle={(value) => {
                setFieldValue('isVisibleOnGraphs', !value);
              }}
              colors={{
                active: {
                  base: '#29ABFF',
                },
              }}
            />
            <div className="popup_bot_guides-input-panel">
              <div className="popup_bot_guides-input-container_third">
                <p className="popup_text-large-light">Renewal</p>
                <select name="renewalType" onChange={handleChange} className={`popup_admin_select ${errors.renewalTypes && 'invalid-input'}`} value={renewalType}>
                  <option value="">Choose Renewal Type</option>
                  {selectOptions.renewalTypes.map((renewal) => (
                    <option value={renewal.value}>{renewal.label}</option>
                  ))}
                </select>
              </div>
              <div className="popup_bot_guides-input-container_third">
                <div
                  className="popup_blue-btn"
                  style={{ width: '100%', margin: 0 }}
                  role="button"
                  tabIndex={0}
                  aria-label="Home page header"
                  aria-hidden="true"
                  onClick={() => {
                    handleAddRenewalType(values, setFieldValue);
                  }}
                >
                  <span
                    className="popup_blue-btn_text"
                  >
                    Add Renewal Type
                  </span>
                </div>
              </div>
            </div>

            <div className="popup_bot_guides-input-container_full">
              <p className="popup_text-large-light">Renewal Types</p>
              <div className="popup_bot_guides-tag_container">
                {values.renewalTypes && values.renewalTypes.length > 0 && values.renewalTypes.map((renewal) => {
                  const capitalizedRenewal = renewal.charAt(0).toUpperCase() + renewal.slice(1);
                  return (
                    <GuideTagLarge tag={capitalizedRenewal} handleRemoveRenewalType={handleRemoveRenewalType} values={values} setFieldValue={setFieldValue} setValues={setValues} renewalType={renewal} />);
                })}
              </div>

            </div>

            <div className="popup_bot_guides-input-container_full">
              <p className="popup_text-large-light">Bot Values</p>
              <div className="popup_bot_guides-tag_container">
                {values.values && values.values.length > 0 && values.values.map((tag) => <GuideTagLarge tag={tag} handleRemoveTag={handleRemoveTag} values={values.values} setFieldValue={setFieldValue} />)}
              </div>
              <input
                type="text"
                name="values"
                className={`popup_admin_input ${errors.values && 'invalid-input'}`}
                placeholder="Add more"
                onKeyPress={handleKeyPress(setFieldValue, values.values)}
                onBlur={handleBlur(validateField)}
                onKeyDown={disableSpacebar}
              />
            </div>

            <div className="popup_bot_guides_edit-button_container">
              <div
                className="popup_red-btn"
                style={{ width: '45%' }}
                role="button"
                tabIndex={0}
                aria-label="Home page header"
                aria-hidden="true"
                onClick={toggleModal}
              >
                <span
                  className="popup_red-btn_text"
                >
                  Cancel

                </span>
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
};
export default GuidesValidBotAdminEditPopup;
