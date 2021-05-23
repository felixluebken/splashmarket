import './homepage.css';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RankedMemberPanel from '../panels/RankedMemberPanel';
import UserService from '../../services/UserService';

function HomepageLeaderboard() {
  const [topUsers, setTopUsers] = useState([]);

  const history = useHistory();

  const handleRedirect = (route) => {
    history.push(route);
  };
  // Get top transactions here
  useEffect(() => {
    const onGetMostTransactionsSuccess = (response) => {
      if (response.data && response.data.length > 0) {
        setTopUsers(response.data);
      }
    };

    const onGetMostTransactionsError = (error) => {
      console.log('ERROR: ', error.response);
    };

    UserService.FindUsersWithMostTransactions(onGetMostTransactionsSuccess, onGetMostTransactionsError);
  }, []);

  return (
    <div className="section_leaderboard">
      <div className="leaderboard_text">
        <span
          className="section_title-blue"
          role="button"
          tabIndex={0}
          aria-label="Home page header"
          aria-hidden="true"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            handleRedirect('/leaderboard');
          }}
        >
          Member Leaderboard
        </span>
        <span className="section_title-big">View the members with the most transactions</span>
        <span className="section_text">Never worry about the reputation of your buyer or seller again. Splash Market makes it easy for you to verify any user.</span>
      </div>
      <div className="leaderboard_img">
        {topUsers && topUsers.map((user, index) => {
          const {
            username, discriminator, avatar, transactionsLength, createdAt, id,
          } = user;
          return (
            <RankedMemberPanel
              key={id}
              id={id}
              username={`${username}#${discriminator}`}
              transactions={transactionsLength}
              memberSince={createdAt}
              ranking={index + 1}
              avatar={avatar}
            />
          );
        })}
      </div>
    </div>
  );
}

export default HomepageLeaderboard;
