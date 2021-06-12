import React from 'react';
import './panels.css';
import { useHistory } from 'react-router-dom';
import GuideTag from '../small-panels/guideTags';
import GuideTagAdd from '../small-panels/guideTagsAdd';

/*
iconBackgroundColor             -str
iconUrl                         -str
botName                         -str
*/

function GuideBotPanelAdmin(props) {
  const { iconBackgroundColor, iconUrl, botName } = props;

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
      style={{ cursor: 'pointer' }}
      onClick={() => {
        // handleRedirect('/');
      }}
    >
      <div className="guides_panel_admin-header">
        <div className="guides_panel-icon_frame" style={{ margin: 0, backgroundColor: `${iconBackgroundColor}` }}>
          <div className="guides_panel-icon" style={{ backgroundImage: `url(${iconUrl})` }} />
        </div>

        <div className="guides_panel_admin-delete_btn" />
      </div>

      <p className="panel_text-normal" style={{ marginLeft: '25px' }}>{botName}</p>
      <div className="guides_panel-tags_container">
        <GuideTag tag="Supreme" />
        <GuideTag tag="Adidas" />
        <GuideTag tag="YS" />
        <GuideTag tag="Walmart" />
        <GuideTag tag="Best Buy" />
        <GuideTagAdd />
      </div>
    </div>
  );
}
export default GuideBotPanelAdmin;
