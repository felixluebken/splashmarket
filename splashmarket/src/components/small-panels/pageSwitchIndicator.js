import React from 'react';
import { useHistory } from 'react-router-dom';
// import PageSwitch from '../page-switch/PageSwitch';
import './small-panels.css';

/*
active          -str    true or false
number          -str    number of the page

*/

function PageSwitchIndicator(props) {
  const history = useHistory();
  const { active, number } = props;
  const handlePageSwitch = () => {
    history.push({
      location: '/bots',
      search: `?page=${number}`,
    });
  };
  if (active) {
    return (
      <div
        className="page_switch-indicator-container_active"
      >
        <span className="page_switch-active_text">{number}</span>
      </div>
    );
  }
  return (
    <div
      className="page_switch-indicator-container"
      role="button"
      tabIndex={0}
      aria-label="Home page header"
      aria-hidden="true"
      style={{ cursor: 'pointer' }}
      onClick={() => {
        handlePageSwitch();
      }}
    >
      <span className="page_switch-text">{number}</span>
    </div>
  );
}

export default PageSwitchIndicator;
