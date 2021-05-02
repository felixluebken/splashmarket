import React from 'react';
import './panels.css';
import { useHistory } from 'react-router-dom';
import GuideTag from '../small-panels/guideTags';

/*
iconBackgroundColor             -str
iconUrl                         -str
botName                         -str
*/

function GuideBotPanelUser(props) {
  const {
    iconBackgroundColor, iconUrl, botName, tags,
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
      onClick={() => {
        handleRedirect(`/guides/${botName.toLowerCase()}`);
      }}
    >
      <div className="guides_panel_admin-header">
        <div
          className="guides_panel-icon_frame"
          style={{ margin: 0, backgroundColor: `${iconBackgroundColor}`, cursor: 'pointer' }}

        >
          <div className="guides_panel-icon" style={{ backgroundImage: `url(${iconUrl})` }} />
        </div>

        <div
          className="guides_panel_admin-delete_btn"
          role="button"
          tabIndex={0}
          aria-label="Home page header"
          aria-hidden="true"
          onClick={() => {
            console.log('CLICKING DELETE');
            // handleRedirect('/');
          }}
        />
      </div>
      <p className="panel_text-normal" style={{ marginLeft: '25px' }}>{botName}</p>
      <div className="guides_panel-tags_container">
        {tags && tags.length > 0 && tags.map((tag) => <GuideTag key={tag} tag={tag} />)}

      </div>
    </div>
  );
}
export default GuideBotPanelUser;
