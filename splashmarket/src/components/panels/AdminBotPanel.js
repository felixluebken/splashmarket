import React from 'react';
import './panels.css';
import { useHistory } from 'react-router-dom';
import GuideTag from '../small-panels/guideTags';
import GuideService from '../../services/GuideService';

/*
iconBackgroundColor             -str
iconUrl                         -str
botName                         -str
*/

function AdminBotPanel(props) {
  const {
    iconBackgroundColor, iconUrl, botName, id = '', handleDelete, validRenewalTypes = [], values = [], handleEdit, bot = {},
  } = props;

  const history = useHistory();

  const handleRedirect = (route) => {
    history.push(route);
  };

  return (
    <div
      className="guides_panel"
      role="button"
      tabIndex={0}
      aria-label="Home page header"
      aria-hidden="true"
    >
      <div className="guides_panel_admin-header">
        <div
          className="guides_panel-icon_frame"
          style={{ margin: 0, backgroundColor: `${iconBackgroundColor}`, cursor: 'pointer' }}

        >
          <div className="guides_panel-icon" style={{ backgroundImage: `url(${iconUrl})` }} />
        </div>

        <div
          className="guides_admin-add_button"
          role="button"
          tabIndex={0}
          aria-label="Home page header"
          aria-hidden="true"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            handleEdit(bot);
          }}
        >
          <span
            className="guides_admin-button_text"
          >
            Edit Bot
          </span>
        </div>

        <div
          name="delete"
          id="delete"
          className="guides_panel_admin-delete_btn"
          style={{ marginLeft: '0' }}
          role="button"
          tabIndex={0}
          aria-label="Home page header"
          aria-hidden="true"
          onClick={() => {
            handleDelete(id);
          }}
        />
      </div>
      <p className="panel_text-normal" style={{ marginLeft: '25px' }}>{botName}</p>
      <p style={{ marginLeft: '25px' }}>Renewal Types</p>
      <div className="guides_panel-tags_container">
        {validRenewalTypes && validRenewalTypes.length > 0 && validRenewalTypes.map((tag) => <GuideTag key={tag} tag={tag} />)}
      </div>

      <p style={{ marginLeft: '25px' }}>Valid Bot Values</p>
      <div className="guides_panel-tags_container">
        {values && values.length > 0 && values.map((tag) => <GuideTag key={tag} tag={tag} />)}
      </div>
    </div>
  );
}
export default AdminBotPanel;
