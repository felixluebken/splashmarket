/* eslint-disable camelcase */
import React, { useContext, useState, useEffect } from 'react';
import './Dashboard.css';
import { useHistory } from 'react-router-dom';
import HeaderLoggedIn from '../components/header/headerLoggedIn';

import TransactionHistoryPanel from '../components/list-panels/transactionHistory';
import { UserContext } from '../context/UserContext';
import { getLocalTime } from '../helpers/helpers';

/*
PROP PARAMS

dashboardGreeting           -str
username                    -str
avatar                      -str (discord avatar url)
discriminator               -str
transactions_mm             -str
transactions                -str
totalSold                   -str
totalPurchased              -str
droplets                    -str
dropletsRedeemUrl           -str (url for redeeming droplets)

manageSubscriptionUrl       -str (url for managing subscriptions)
paymentType                 -str
paymentLast4                -str

MOST TRANSACTED #1
numTransactions1            -str
botName1                    -str
botBackgroundColor1         -str (hex)
botIcon1                    -str (url)
botBarColor1                -str (hex)
botBarPercent1              -str (% of progress)

MOST TRANSACTED #2
numTransactions2            -str
botName2                    -str
botBackgroundColor2         -str (hex)
botIcon2                    -str (url)
botBarColor2                -str (hex)
botBarPercent2              -str (% of progress)

MOST TRANSACTED #3
numTransactions3            -str
botName3                    -str
botBackgroundColor3         -str (hex)
botIcon3                    -str (url)
botBarColor3                -str (hex)
botBarPercent3              -str (% of progress)

*/

function DashboardAdmin(props) {
  const [user] = useContext(UserContext);
  const [greeting, setGreeting] = useState('');
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
    dropletsRedeemUrl, manageSubscriptionUrl, paymentType, paymentLast4, numTransactions1, botBarColor1,
  } = props;

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
                <p className="dashboard_text-normal" style={{ padding: '5px 0px 5px 70px', margin: '0px' }}>{username}</p>
                <p className="dashboard_text-light" style={{ padding: '5px 0px 0px 70px', margin: '0px' }}>{discriminator}</p>
              </div>
            </div>

            <div className="dashboard_admin-mm_transactions">
              <div className="dashboard_admin-mm_transactions-icon_container">
                <div className="dashboard_admin-mm_transactions-icon" />
              </div>
              <h3 className="dashboard_text-normal" style={{ margin: '0px 0px 0px 20px' }}>{transactionsMMd}</h3>
              <p className="dashboard_text-light" style={{ margin: '5px 0px 0px 20px' }}>Total Transactions MM&#39;d</p>
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
                  <TransactionHistoryPanel botBackground="black" botIcon={logo || ''} botName={bot} date={transactionDate} position={position} otherParty={otherParty} transcriptTitle={transcriptTitle || 'Transcript Not Available'} transcriptUrl={uri} />
                );
              })}
            </div>
          </div>

        </div>
        <div className="dashboard_body-right">
          <div className="dashboard_droplets_panel">
            <div className="dashboard_droplets_panel-header">
              <p className="dashboard_text-normal">Droplets</p>
              <a href={dropletsRedeemUrl} className="dashboard_link_text-normal">Redeem ⇾</a>
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
            {topTransactedBots.map((transactedBot) => {
              const { bot, logo, occurences } = transactedBot;
              const occurencePercentage = `${(occurences / transactions.length) * 100}%`;
              return (
                <div className="dashboard_most-transacted_bot-section">
                  <div className="dashboard_most-transacted_bot-frame" style={{ backgroundColor: 'black' }}>
                    <div className="dashboard_most-transacted_bot-icon" style={{ backgroundImage: `url(${logo})` }} />
                  </div>

                  <div className="dashboard_most-transacted-text_container">
                    <p className="dashboard_text-light-xs" style={{ margin: '0' }}>
                      {numTransactions1}
                      Transactions
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

          <div className="dashboard_payment-panel">
            <div className="dashboard_payment-panel-card_icon" />
            <div className="dashboard_payment-panel-text_container">
              <p className="dashboard_text-light" style={{ margin: '0px 0px 10px 0px' }}>
                {paymentType}
                {' '}
                ••••
                {' '}
                {paymentLast4}
              </p>
              <a className="dashboard_link_text-normal" href={manageSubscriptionUrl}>Manage Subscription ⇾</a>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default DashboardAdmin;
