/* eslint-disable camelcase */
import React, { useContext, useState, useEffect } from 'react';
import './Dashboard.css';
import { useHistory } from 'react-router-dom';
import ToggleButton from 'react-toggle-button';
import HeaderLoggedIn from '../components/header/headerLoggedIn';
import TransactionHistoryPanel from '../components/list-panels/transactionHistory';
import { UserContext } from '../context/UserContext';
import { getLocalTime } from '../helpers/helpers';
import UserService from '../services/UserService';

function DashboardAdmin(props) {
  const [user] = useContext(UserContext);
  const [greeting, setGreeting] = useState('');
  const [isToggled, setIsToggled] = useState(user.showTransactions);

  const history = useHistory();
  const {
    username, discriminator, avatar, transactions, totalBought, totalSold, currency, topTransactedBots, transactionsMMd,
  } = user;
  useEffect(() => {
    if (!user.isLoggedIn) {
      history.push('/');
    }
    setGreeting(getLocalTime());
  }, []);
  const {
    dropletsRedeemUrl, manageSubscriptionUrl, paymentType, paymentLast4, botBarColor1,
  } = props;

  const handleRedirect = (route) => {
    history.push(route);
  };

  return (
    <>
      <HeaderLoggedIn />
      <div className="dashboard_body">
        <div className="dashboard_body-left">

          <div className="dashboard_admin-banner-container">
            <div className="dashboard_admin-banner">
              <p className="dashboard_text-normal dashboard_banner-greeting_text-admin">{`${greeting},`}</p>
              <div className="dashboard_admin">
                <div className="dashboard_user-profile-pic" style={{ backgroundImage: `url(${avatar})` }} />
                <div style={{ display: 'flex' }}>
                  <p className="dashboard_text-normal" style={{ padding: '5px 15px 5px 14px', margin: '0px' }}>{username}</p>
                  <ToggleButton
                    inactiveLabel="Show"
                    activeLabel="Hide"
                    value={isToggled}
                    onToggle={(value) => {
                      setIsToggled(!isToggled);

                      const onUpdateSuccess = (response) => {
                        setIsToggled(response.data);
                      };
                      const onUpdateError = (error) => {
                        console.log('ERROR UPDATING TRANSACTIONS:', error.response.data);
                      };
                      const body = {
                        showTransactions: !isToggled,
                      };
                      UserService.UpdateUser(user.id, body, onUpdateSuccess, onUpdateError);
                    }}
                    colors={{
                      active: {
                        base: '#29ABFF',
                      },
                    }}
                  />
                </div>

                <p className="dashboard_text-light" style={{ padding: '5px 0px 0px 70px', margin: '0px' }}>{discriminator}</p>
              </div>
            </div>

            <div className="dashboard_admin-mm_transactions">
              <div className="dashboard_admin-mm_transactions-icon_container">
                <div className="dashboard_admin-mm_transactions-icon" />
              </div>
              <h3 className="dashboard_text-normal dashboard-transactions-mmd-text" style={{ margin: '0px 0px 0px 20px' }}>{transactionsMMd}</h3>
              <p className="dashboard_text-light dashboard-transactions-mmd-text" style={{ margin: '5px 0px 0px 20px' }}>Total Transactions MM&#39;d</p>
            </div>
          </div>

          <div className="dashboard_stats-container">

            <div className="dashboard_stats-panel">
              <div className="dashboard_stats-icon_container">
                <div className="dashboard_stats-icon dashboard_stats-icon-transactions" />
              </div>
              <div className="dashboard_stats-text_container">
                <h3 className="dashboard_text-normal" style={{ margin: '5px 0px 0px 0px' }}>{transactions.length}</h3>
                <p className="dashboard_text-light" style={{ margin: '5px 0px 0px 0px' }}>Transactions</p>
              </div>
            </div>

            <div className="dashboard_stats-panel">
              <div className="dashboard_stats-icon_container">
                <div className="dashboard_stats-icon dashboard_stats-icon-sold" />
              </div>
              <div className="dashboard_stats-text_container">
                <h3 className="dashboard_text-normal" style={{ margin: '5px 0px 0px 0px' }}>{totalSold}</h3>
                <p className="dashboard_text-light" style={{ margin: '5px 0px 0px 0px' }}>Total Sold</p>
              </div>
            </div>

            <div className="dashboard_stats-panel">
              <div className="dashboard_stats-icon_container">
                <div className="dashboard_stats-icon dashboard_stats-icon-purchased" />
              </div>
              <div className="dashboard_stats-text_container">
                <h3 className="dashboard_text-normal" style={{ margin: '5px 0px 0px 0px' }}>{totalBought}</h3>
                <p className="dashboard_text-light" style={{ margin: '5px 0px 0px 0px' }}>Total Purchased</p>
              </div>
            </div>

          </div>

          <div className="dashboard_transaction-history_panel">
            <p className="dashboard_text-normal">Transaction History</p>
            <table>
              <tr>
                <th style={{ minWidth: '10%' }}>Bot</th>
                <th>Date</th>
                <th>Position</th>
                <th>Other Party</th>
                <th>Transcript</th>
              </tr>
            </table>

            <div className="dashboard_transaction-history_panel-container">
              {transactions.map((transaction) => {
                const {
                  bot, transactionDate, position, otherParty, logo, transcriptHTML, transcriptTitle,
                } = transaction;

                let uri = null;
                if (transcriptHTML) {
                  uri = `data:text/html,${escape(transcriptHTML)}`;
                }
                return (
                  <TransactionHistoryPanel botBackground="transparent" botIcon={logo || ''} botName={bot} date={transactionDate} position={position} otherParty={otherParty} transcriptTitle={transcriptTitle || 'Transcript Not Available'} transcriptUrl={uri} />
                );
              })}
            </div>
          </div>

        </div>
        <div className="dashboard_body-right">
          <div className="dashboard_droplets_panel">
            <div className="dashboard_droplets_panel-header">
              <p className="dashboard_text-normal">Droplets</p>
              <a
                className="dashboard_link_text-normal"
                role="button"
                tabIndex={0}
                aria-label="Home page header"
                aria-hidden="true"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  handleRedirect('/droplets');
                }}
              >
                Redeem ⇾

              </a>
            </div>
            <div className="dashboard_droplets_panel-body">
              <div className="dashboard_droplets_panel-icon_container">
                <div className="dashboard_droplets_panel-icon" />
              </div>
              <div className="dashboard_droplets_panel-text_container">
                <p className="dashboard_text-light" style={{ margin: '5px 0px' }}>Your current balance</p>
                <h4 className="dashboard_text-normal" style={{ margin: '5px 0px' }}>
                  {`${currency} Droplets`}
                </h4>
              </div>
            </div>
          </div>

          <div className="dashboard_most-transacted_panel">
            <p className="dashboard_text-normal dashboard_most-transacted_header">Most Transacted Bots</p>
            {topTransactedBots && topTransactedBots.map((transactedBot) => {
              const { bot, logo, occurences } = transactedBot;
              const occurencePercentage = `${(occurences / transactions.length) * 100}%`;
              return (
                <div className="dashboard_most-transacted_bot-section">
                  <div className="dashboard_most-transacted_bot-frame" style={{ backgroundColor: 'transparent' }}>
                    <div className="dashboard_most-transacted_bot-icon" style={{ backgroundImage: `url(${logo})` }} />
                  </div>

                  <div className="dashboard_most-transacted-text_container">
                    <p className="dashboard_text-light-xs" style={{ margin: '0' }}>
                      {`${occurences} Transactions`}
                    </p>
                    <p className="dashboard_text-normal-small" style={{ margin: '5px 0px 0px 0px' }}>{bot}</p>
                    <div className="dashboard_most-transacted-bar_container">
                      <div className="dashboard_most-transacted-bar" style={{ backgroundColor: `${botBarColor1}`, width: occurencePercentage }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </>
  );
}

export default DashboardAdmin;
