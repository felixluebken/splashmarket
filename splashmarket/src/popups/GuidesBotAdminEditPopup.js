import React, { useState } from 'react';
import './Popups.css';
import {
  Formik,
} from 'formik';
import GuideTagLarge from '../components/small-panels/guideTagsLarge';
import { guideValidationSchema } from '../helpers/validationSchema';
import { enforceNumber } from '../helpers/helpers';

const GuidesBotAdminEditPopup = (props) => {
  const { tags, toggleEditGuideModal, botGuide } = props;

  const initialValues = {
    tags: tags || [],
    unbindType: '',
    renewalTypes: [],
    renewalType: '',
    renewalPrice: '',
    renewalInterval: '',
    systemsSupported: '',
    middleMan: '',
    scammerPrevention: '',
    twitterURL: '',
    instagramURL: '',
    gracePeriod: '',
  };

  const handleSubmit = (values, validateForm) => {
    console.log('VALUES: ', values);
    validateForm().then(async (errors) => {
      console.log('ERRORS: ', errors);
      if (Object.keys(errors).length === 0) {
        // Create form data and append File + json data
        const formData = new FormData();
        formData.append('document', values.fileContents);
        const stringifiedJSON = JSON.stringify(values);
        formData.append('data', stringifiedJSON);

        // await DropletService.CreateDroplet(formData, onDropletCreateSuccess, onDropletCreateError);
      }
    });
  };

  const handleBlur = (validateField) => (event) => {
    validateField(event.target.name);
  };

  const handleKeyPress = (setFieldValue, tagValues) => (e) => {
    // it triggers by pressing the enter key
    if (e.which === 13) {
      const copiedTags = [...tagValues, e.target.value];
      setFieldValue('tags', copiedTags);
      e.target.value = '';
      // handleBotSearch();
    }
  };

  const handleRemoveTag = (values, tagToRemove, setFieldValue) => {
    const newTags = [...values.tags];
    const foundTag = newTags.findIndex((tag) => tagToRemove === tag);
    if (foundTag > -1) {
      console.log('SPLICING');
      newTags.splice(foundTag, 1);
      console.log('NEW TAGS:', newTags);
      setFieldValue('tags', newTags);
    }
  };

  const handleRemoveRenewalType = (values, tagToRemove, setValues) => {
    const newRenewalTypes = [...values.renewalTypes];
    const foundTag = newRenewalTypes.findIndex((tag) => {
      console.log('TAG: ', tag);
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
        renewalPrice: '',
        renewalInterval: '',
      });
    }
  };

  const handleAddRenewalType = (values, setFieldValue) => {
    const renewalType = {
      renewalType: values.renewalType,
      renewalInterval: values.renewalInterval,
      price: values.renewalPrice,
    };
    const copiedRenewalTypes = [...values.renewalTypes, renewalType];
    setFieldValue('renewalTypes', copiedRenewalTypes);
    setFieldValue('renewalType', '');
    setFieldValue('renewalPrice', '');
    setFieldValue('renewalInterval', '');
  };

  return (
    <Formik
      validationSchema={guideValidationSchema}
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
        console.log('VALUES: ', values);

        return (
          <div className="popup_panel-big">
            <div className="popup_bot_guides-input-panel">
              <div className="popup_bot_guides-input-container_half">
                <p className="popup_text-large-light">Bot Unbind Type</p>
                <input name="unbindType" className={`popup_admin_input ${errors.unbindType && 'invalid-input'}`} placeholder="Enter type" onChange={handleChange} />
              </div>
              <div className="popup_bot_guides-input-container_half">
                <p className="popup_text-large-light">Grace Period (optional)</p>
                <input name="gracePeriod" className="popup_admin_input" placeholder="Enter grace period in days" onChange={handleChange} />
              </div>
            </div>

            <div className="popup_bot_guides-input-panel">
              <div className="popup_bot_guides-input-container_third">
                <p className="popup_text-large-light">Renewal</p>
                <select name="renewalType" onChange={handleChange} className={`popup_admin_select ${errors.renewalTypes && 'invalid-input'}`}>
                  <option value="">Choose Renewal Type</option>
                  <option value="lifetime">Lifetime</option>
                  <option value="renewal">Renewal</option>
                </select>
              </div>
              <div className="popup_bot_guides-input-container_third">
                <p className="popup_text-large-light">Renewal Price (optional)</p>
                <input name="renewalPrice" onChange={handleChange} className="popup_admin_input" placeholder="Enter price" value={values.renewalPrice} />
              </div>
              <div className="popup_bot_guides-input-container_third">
                <p className="popup_text-large-light">Renewal Interval</p>
                <select name="renewalInterval" onChange={handleChange} className="popup_admin_select">
                  <option value="">No Interval</option>
                  <option value="1 Week">1 Week</option>
                  <option value="1 Month">1 Month</option>
                  <option value="3 Months">3 Months</option>
                  <option value="6 Months">6 Months</option>
                  <option value="12 Months">12 Months</option>
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
                {values.renewalTypes && values.renewalTypes.length > 0 && values.renewalTypes.map((renewalType) => {
                  let tag;
                  if (renewalType.renewalType.toLowerCase() === 'lifetime') {
                    if (renewalType.price) {
                      tag = `Lifetime/${renewalType.price}`;
                    } else {
                      tag = 'Lifetime';
                    }
                  } else if (renewalType.price && renewalType.renewalInterval) {
                    tag = `${renewalType.price}/${renewalType.renewalInterval}`;
                  } else {
                    tag = `${renewalType.renewalType}`;
                  }
                  return (
                    <GuideTagLarge tag={tag} handleRemoveRenewalType={handleRemoveRenewalType} values={values} setFieldValue={setFieldValue} setValues={setValues} renewalType={renewalType} />);
                })}
              </div>

            </div>

            <div className="popup_bot_guides-input-container_full">
              <p className="popup_text-large-light">Sites Supported</p>
              <div className="popup_bot_guides-tag_container">
                {values.tags && values.tags.length > 0 && values.tags.map((tag) => <GuideTagLarge tag={tag} handleRemoveTag={handleRemoveTag} values={values} setFieldValue={setFieldValue} />)}
              </div>
              <input
                type="text"
                name="tags"
                className={`popup_admin_input ${errors.tags && 'invalid-input'}`}
                placeholder="Add more"
                onKeyPress={handleKeyPress(setFieldValue, values.tags)}
                onBlur={handleBlur(validateField)}
              />
            </div>

            <div className="popup_bot_guides-input-container_full">
              <p className="popup_text-large-light">Systems Supported</p>
              <select name="systemsSupported" className={`popup_admin_select ${errors.systemsSupported && 'invalid-input'}`} onChange={handleChange}>
                <option value="windows">Windows</option>
                <option value="macOS">Mac OS</option>
                <option value="all">Windows & Mac OS</option>
              </select>
            </div>

            <div className="popup_bot_guides-input-panel">
              <div className="popup_bot_guides-input-container_half">
                <p className="popup_text-large-light">Middleman</p>
                <textarea name="middleman" className="popup_admin_text-area" placeholder="Enter middleman information here" onChange={handleChange} />
              </div>
              <div className="popup_bot_guides-input-container_half">
                <p className="popup_text-large-light">Scammer Prevention</p>
                <textarea name="scammerPrevention" className={`popup_admin_text-area ${errors.scammerPrevention && 'invalid-input'}`} placeholder="Enter scammer prevention text here" onChange={handleChange} />
              </div>
            </div>

            <div className="popup_bot_guides-input-panel">
              <div className="popup_bot_guides-input-container_half">
                <p className="popup_text-large-light">Twitter (optional)</p>
                <input name="twitterURL" className="popup_admin_input" placeholder="Enter link here" onChange={handleChange} />
              </div>
              <div className="popup_bot_guides-input-container_half">
                <p className="popup_text-large-light">Instagram (optional)</p>
                <input name="instagramURL" className="popup_admin_input" placeholder="Enter link here" onChange={handleChange} />
              </div>
            </div>

            <div className="popup_bot_guides_edit-button_container">
              <div
                className="popup_red-btn"
                style={{ width: '45%' }}
                role="button"
                tabIndex={0}
                aria-label="Home page header"
                aria-hidden="true"
                onClick={toggleEditGuideModal}
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
export default GuidesBotAdminEditPopup;
