import React, { useContext, useEffect, useState } from 'react';
import './Dashboard.css';
import { useParams } from 'react-router-dom';
import ToggleButton from 'react-toggle-button';
import { loadStripe } from '@stripe/stripe-js';
import HeaderLoggedIn from '../components/header/headerLoggedIn';
import TransactionHistoryPanel from '../components/list-panels/transactionHistory';
import { initialState, SET_USER, UserContext } from '../context/UserContext';
import { getLocalTime } from '../helpers/helpers';
import { UserSearchContext } from '../context/UserSearchContext';
import UserService from '../services/UserService';
import StripeService from '../services/StripeService';

const stripeKey = process.env.REACT_APP_STRIPE_KEY;

const DashboardUser = (props) => {
  const { id } = useParams();
  const [user] = useContext(UserContext);
  const [userSearch, userDispatch] = useContext(UserSearchContext);
  const [userView, setUserView] = useState(null);
  const [greeting, setGreeting] = useState('');
  const [isToggled, setIsToggled] = useState(user.showTransactions);

  let username; let discriminator; let avatar; let transactions; let totalBought; let totalSold; let currency; let
    topTransactedBots; let
    showTransactions;
  let subscriptionExpiry;
  let cardLastFour;
  let subscriptionActive;
  let roles;
  useEffect(() => {
    if (id) {
      if (userSearch.id) {
        setUserView(userSearch);
      }
    } else {
      setUserView(user);
    }
  }, [userView, userSearch]);

  if (userView) {
    ({
      username, discriminator, avatar, transactions, totalBought, totalSold, currency, topTransactedBots, showTransactions,
      subscriptionExpiry = null,
      subscriptionActive = false,
      cardLastFour = null,
      roles = [],
    } = userView);
  }

  useEffect(() => {
    setGreeting(getLocalTime());

    if (id) {
      const onGetUserSuccess = (response) => {
        userDispatch({
          type: SET_USER,
          payload: {
            value: { ...response.data, isLoggedIn: true },
          },
        });
      };
      const onGetUserError = (error) => {
        console.log('ERROR UPDATING TRANSACTIONS:', error.response.data);
      };

      UserService.GetUser(id, onGetUserSuccess, onGetUserError);

      return (() => {
        userDispatch({
          type: SET_USER,
          payload: {
            value: initialState,
          },
        });
      });
    }
    return null;
  }, []);

  const {
    dropletsRedeemUrl, manageSubscriptionUrl, paymentType, paymentLast4, numTransactions1, botBarColor1,
  } = props;

  const redirectToPurchase = async (sessionID) => {
    const stripe = await loadStripe(stripeKey);

    const { error } = await stripe.redirectToCheckout({
      sessionId: sessionID,
    });
  };

  const handleCreateNewSubscription = () => {
    const onCreateSessionSuccess = (response) => {
      if (response.data) {
        const { sessionId } = response.data;
        redirectToPurchase(sessionId);
      }
    };
    const onCreateSessionError = (error) => {
      console.error('ERROR CREATING SPLASH MARKET STRIPE CHECKOUT: ', error.response);
    };
    const data = {
      metadata: {
        id: user.id,
        username: `${username}#${discriminator}`,
      },
      priceId: 'price_1Ip0wHBm6oW7t42oIP4BHG7P',
    };
    StripeService.CreateCheckoutSession(data, onCreateSessionSuccess, onCreateSessionError);
  };

  if (!userView) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <HeaderLoggedIn />
      <div className="dashboard_body">
        <div className="dashboard_body-left">

          <div className="dashboard_user-banner">
            <p className="dashboard_text-normal dashboard_banner-greeting_text" style={{ padding: '70px 0px 15px 50px', margin: '0px' }}>{`${greeting},`}</p>
            <div className="dashboard_user">
              <div className="dashboard_user-profile-pic" style={{ backgroundImage: `url(${avatar})` }} />
              <div style={{ display: 'flex' }}>
                <p className="dashboard_text-normal" style={{ padding: '5px 15px 5px 14px', margin: '0px' }}>{username}</p>
                {!id && (
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
                )}
              </div>
              <p className="dashboard_text-light" style={{ padding: '5px 0px 0px 70px', margin: '0px' }}>{`#${discriminator}`}</p>

            </div>
          </div>

          <div className="dashboard_stats-container">

            <div className={`dashboard_stats-panel ${!showTransactions && id && 'blur'}`}>
              <div className="dashboard_stats-icon_container">
                <div className="dashboard_stats-icon dashboard_stats-icon-transactions" />
              </div>
              <div className="dashboard_stats-text_container">
                <h3 className="dashboard_text-normal" style={{ margin: '5px 0px 0px 0px' }}>{transactions && transactions.length}</h3>
                <p className="dashboard_text-light" style={{ margin: '5px 0px 0px 0px' }}>Transactions</p>
              </div>
            </div>

            <div className={`dashboard_stats-panel ${!showTransactions && id && 'blur'}`}>
              <div className="dashboard_stats-icon_container">
                <div className="dashboard_stats-icon dashboard_stats-icon-sold" />
              </div>
              <div className="dashboard_stats-text_container">
                <h3 className="dashboard_text-normal" style={{ margin: '5px 0px 0px 0px' }}>{totalSold}</h3>
                <p className="dashboard_text-light" style={{ margin: '5px 0px 0px 0px' }}>Total Sold</p>
              </div>
            </div>

            <div className={`dashboard_stats-panel ${!showTransactions && id && 'blur'}`}>
              <div className="dashboard_stats-icon_container">
                <div className="dashboard_stats-icon dashboard_stats-icon-purchased" />
              </div>
              <div className="dashboard_stats-text_container">
                <h3 className="dashboard_text-normal" style={{ margin: '5px 0px 0px 0px' }}>{totalBought}</h3>
                <p className="dashboard_text-light" style={{ margin: '5px 0px 0px 0px' }}>Total Purchased</p>
              </div>
            </div>

          </div>

          <div className={`dashboard_transaction-history_panel ${!showTransactions && id && 'blur'}`}>
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
              {transactions && transactions.map((transaction) => {
                const {
                  bot, transactionDate, position, otherParty, logo, transcriptHTML, transcriptTitle,
                } = transaction;

                let uri = null;
                if (transcriptHTML) {
                  uri = `data:text/html,${escape(transcriptHTML)}`;
                }
                return (
                  <TransactionHistoryPanel botBackground="black" botIcon={logo || ''} botName={bot} date={transactionDate} position={position} otherParty={otherParty} transcriptTitle={!id && transcriptTitle ? transcriptTitle : 'Transcript Not Available'} transcriptUrl={!id && uri} />
                );
              })}
            </div>
          </div>
        </div>

        <div className="dashboard_body-right">
          {!id && (
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
          )}

          <div className={`dashboard_most-transacted_panel ${!showTransactions && id && 'blur'}`}>
            <p className="dashboard_text-normal dashboard_most-transacted_header">Most Transacted Bots</p>
            {topTransactedBots && topTransactedBots.map((transactedBot) => {
              const { bot, logo, occurences } = transactedBot;
              const occurencePercentage = `${(occurences / transactions.length) * 100}%`;
              return (
                <div className="dashboard_most-transacted_bot-section">
                  <div className="dashboard_most-transacted_bot-frame" style={{ backgroundColor: 'black' }}>
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

          {!id && (
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
                <a
                  className="dashboard_link_text-normal"
                  role="button"
                  tabIndex={0}
                  aria-label="Home page header"
                  aria-hidden="true"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    console.log('SUBSCRIPTION ACTIVE: ', subscriptionActive);
                    if (subscriptionActive) {
                      console.log('MANAGE SUBSCRIPTION THERES ALREADY ACTIVE');
                    } else {
                      handleCreateNewSubscription();
                    }
                    console.log('HANDLING SUBSCRIPTION');
                    // handleRedirect('/');
                  }}
                >
                  Manage Subscription ⇾

                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default DashboardUser;
