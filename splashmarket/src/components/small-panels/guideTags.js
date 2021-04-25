import React from 'react';
import './small-panels.css';

/*

tag         -str

*/

function GuideTag(props) {
  const { tag } = props;
  return (
    <div className="guide_tag-frame">
      <p className="text-normal-small" style={{ margin: '0 10px' }}>{tag}</p>
    </div>
  );
}

export default GuideTag;
