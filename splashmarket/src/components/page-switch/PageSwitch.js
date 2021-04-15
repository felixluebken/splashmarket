import React from 'react';
import './PageSwitch.css';

import PageSwitchIndicator from '../small-panels/pageSwitchIndicator';

function PageSwitch(props) {
  return (
    <div className="page_switch-container">
      <div className="page_switch-left">
        <div className="page_switch-left_icon" />
      </div>

      {/* NO MORE THAN 8 PageSwitchIndicators */}

      <PageSwitchIndicator active="true" number="1" />
      <PageSwitchIndicator active="false" number="2" />
      <PageSwitchIndicator active="false" number="3" />
      <PageSwitchIndicator active="false" number="4" />
      <PageSwitchIndicator active="false" number="5" />
      <PageSwitchIndicator active="false" number="6" />
      <PageSwitchIndicator active="false" number="7" />
      <PageSwitchIndicator active="false" number="8" />

      <div className="page_switch-right">
        <div className="page_switch-right_icon" />
      </div>
    </div>
  );
}

export default PageSwitch;
