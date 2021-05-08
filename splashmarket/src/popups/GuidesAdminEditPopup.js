import React from 'react';
import './Popups.css';

import GuideTag from '../components/small-panels/guideTags';

const GuidesAdminEditPopup = (props) => (
  <div className="popup_panel-small">
    <div className="guides_bot_edit-header">
      <div className="guides_popup-icon_frame">
        <div className="guides_popup-icon" />
      </div>
      <h5 className="popup_text-normal" style={{ marginLeft: '25px' }}>Cybersole</h5>
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

    <div className="guides_bot_edit-button_container">
      <div className="popup_red-btn" style={{ width: '45%' }}>
        <span className="popup_red-btn_text">Cancel</span>
      </div>

      <div className="popup_blue-btn" style={{ width: '45%' }}>
        <span className="popup_blue-btn_text">Save</span>
      </div>
    </div>

  </div>
);

export default GuidesAdminEditPopup;
