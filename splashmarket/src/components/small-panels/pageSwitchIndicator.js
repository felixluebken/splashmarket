import React from 'react';
// import PageSwitch from '../page-switch/PageSwitch';
import './small-panels.css';

/*
active          -str    true or false
number          -str    number of the page

*/

function PageSwitchIndicator(props) {
  const { active, number } = props;
  if (active === 'true') {
    return (
      <div className="page_switch-indicator-container_active">
        <span className="page_switch-active_text">{number}</span>
      </div>
    );
  }
  return (
    <div className="page_switch-indicator-container">
      <span className="page_switch-text">{number}</span>
    </div>
  );
}

export default PageSwitchIndicator;
