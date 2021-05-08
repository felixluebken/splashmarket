import React from 'react';
import './small-panels.css';

/*

tag         -str

*/

function GuideTagLarge(props) {
  const {
    tag, handleRemoveTag, handleRemoveRenewalType, values, setFieldValue, setValues, renewalType, isCloseIconVisible = true,
  } = props;
  return (
    <div className="guide_tag-frame-large">
      <p className="text-normal-large" style={{ margin: '0 10px' }}>{tag}</p>
      {isCloseIconVisible && (
      <div
        className="close_icon"
        role="button"
        tabIndex={0}
        aria-label="Home page header"
        aria-hidden="true"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          if (handleRemoveTag) {
            handleRemoveTag(values, tag, setFieldValue);
          }
          if (handleRemoveRenewalType) {
            handleRemoveRenewalType(values, renewalType, setValues);
          }
        }}
      />
      )}

    </div>
  );
}

export default GuideTagLarge;
