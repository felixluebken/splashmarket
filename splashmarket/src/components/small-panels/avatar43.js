import React from 'react';
import './small-panels.css';

function AvatarPanel43(props) {
  const { avatarUrl } = props;
  return (
    <div className="avatar-panel_43" style={{ marginRight: '5px', backgroundImage: `url(${avatarUrl})` }} />
  );
}

export default AvatarPanel43;
