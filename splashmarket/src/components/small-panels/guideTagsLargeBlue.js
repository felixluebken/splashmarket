import React from 'react';
import './small-panels.css';

/*

tag         -str

*/

function GuideTagLarge(props) {
  const { tag } = props;
  return (
    <div className="guide_tag-frame-large_blue">
      <p className="text-normal-large_blue" style={{ margin: '0 10px' }}>{tag}</p>
    </div>
  );
}

export default GuideTagLarge;
