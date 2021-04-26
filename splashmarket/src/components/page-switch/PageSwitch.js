import React from 'react';
import './PageSwitch.css';

import PageSwitchIndicator from '../small-panels/pageSwitchIndicator';

function PageSwitch(props) {
  const { totalPages, currentPage } = props;

  return (
    <div className="page_switch-container">
      <div className="page_switch-left">
        <div className="page_switch-left_icon" />
      </div>

      {/* NO MORE THAN 8 PageSwitchIndicators */}
      {currentPage && [...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        const isActive = page === currentPage;
        return (
          <PageSwitchIndicator active={isActive} number={page} />
        );
      })}

      <div className="page_switch-right">
        <div className="page_switch-right_icon" />
      </div>
    </div>
  );
}

export default PageSwitch;
