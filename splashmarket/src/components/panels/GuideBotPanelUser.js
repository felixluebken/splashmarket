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

function GuideBotPanelUser(props) {
  const {
    iconBackgroundColor, iconUrl, botName, tags, id = '', handleDelete, isAdmin,
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
      onClick={(event) => {
        if (event.target.id !== 'delete') {
          handleRedirect(`/guides/${botName.toLowerCase()}`);
        }
      }}
    >
      <div className="guides_panel_admin-header">
        <div
          className="guides_panel-icon_frame"
          style={{ margin: 0, backgroundColor: `${iconBackgroundColor}`, cursor: 'pointer' }}

        >
          <div className="guides_panel-icon" style={{ backgroundImage: `url(${iconUrl})` }} />
        </div>

        {isAdmin && (
        <div
          name="delete"
          id="delete"
          className="guides_panel_admin-delete_btn"
          role="button"
          tabIndex={0}
          aria-label="Home page header"
          aria-hidden="true"
          onClick={() => {
            handleDelete(id);
          }}
        />
        )}
      </div>
      <p className="panel_text-normal" style={{ marginLeft: '25px' }}>{botName}</p>
      <div className="guides_panel-tags_container">
        {tags && tags.length > 0 && tags.map((tag) => <GuideTag key={tag} tag={tag} />)}

      </div>
    </div>
  );
}
export default GuideBotPanelUser;
