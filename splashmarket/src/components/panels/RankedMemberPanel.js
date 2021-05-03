import React from 'react';
import './panels.css';
import { useHistory } from 'react-router-dom';

const RankedMemberPanel = (props) => {
  const history = useHistory();
  const {
    avatar, username, ranking, transactions, memberSince, id,
  } = props;

  const handleRedirect = (route) => {
    history.push(route);
  };
  return (
    <div
      className="ranked_member_panel"
      role="button"
      tabIndex={0}
      aria-label="Home page header"
      aria-hidden="true"
      style={{ cursor: 'pointer' }}
      onClick={() => {
        handleRedirect(`user/${id}/`);
      }}
    >
      <div className="ranked_member_panel-avatar">
        <div className="ranked_member_panel-avatar-img" style={{ backgroundImage: `url(${avatar})` }} />
      </div>
      <div className="ranked_member_panel-content">
        <p className="panel_text-normal">{username}</p>
        <p className="panel_text-light" style={{ marginTop: '10px' }}>
          {`${transactions} Transactions | Member since ${memberSince}`}
        </p>
      </div>
      <div className="ranked_member_panel-rank">
        <div className={`ranked_member_panel-rank-img rank_member_panel-${ranking}`} />
      </div>
    </div>
  );
};

export default RankedMemberPanel;
