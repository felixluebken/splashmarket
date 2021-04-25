import React from 'react';
import './panels.css';

import GuideTag from '../small-panels/guideTags';

/*
iconBackgroundColor             -str
iconUrl                         -str
botName                         -str
*/

function GuideBotPanelUser(props) {
  const { iconBackgroundColor, iconUrl, botName } = props;
  return (
    <div className="guides_panel">
      <div className="guides_panel-icon_frame" style={{ backgroundColor: `${iconBackgroundColor}` }}>
        <div className="guides_panel-icon" style={{ backgroundImage: `url(${iconUrl})` }} />
      </div>
      <p className="panel_text-normal" style={{ marginLeft: '25px' }}>{botName}</p>
      <div className="guides_panel-tags_container">
        <GuideTag tag="Supreme" />
        <GuideTag tag="Adidas" />
        <GuideTag tag="YS" />
        <GuideTag tag="Walmart" />
        <GuideTag tag="Best Buy" />
      </div>
    </div>
  );
}
export default GuideBotPanelUser;
