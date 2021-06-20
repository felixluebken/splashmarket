import React, { useContext, useEffect, useState } from 'react';
import './Dashboard.css';
import { useParams, useHistory } from 'react-router-dom';
import ToggleButton from 'react-toggle-button';
import { loadStripe } from '@stripe/stripe-js';
import Loader from 'react-loader-spinner';
import moment from 'moment';
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
  const [isSubscriptionActive, setIsSubscriptionActive] = useState(false);
  let username; let discriminator; let avatar; let transactions; let totalBought; let totalSold; let currency; let
    topTransactedBots; let
    showTransactions;
  let subscriptionExpiry;
  let cardLastFour;
  let cardBrand;
  let roles;
  let customerID;
  let subscriptionStart;
  let freeTransactionCount;
  let subscriptionCancelAtPeriodEnd;

  const history = useHistory();

  const handleRedirect = (route) => {
    history.push(route);
  };

  useEffect(() => {
    if (id) {
      if (userSearch.id) {
        setUserView(userSearch);
      }
    } else {
      setUserView(user);
    }
    if (userView) {
      if (!userView.subscriptionID) {
        setIsSubscriptionActive(false);
      } else if (userView.subscriptionStart && userView.subscriptionExpiry) {
        setIsSubscriptionActive(moment(userView.subscriptionStart).isSameOrBefore(moment(userView.subscriptionExpiry)));
      } else {
        setIsSubscriptionActive(false);
      }
    }
  }, [userView, userSearch]);

  if (userView) {
    ({
      username, discriminator, avatar, transactions, totalBought, totalSold, currency, topTransactedBots, showTransactions,
      subscriptionExpiry = null,
      cardLastFour = null,
      cardBrand = null,
      roles = [],
      subscriptionStart = null,
      subscriptionCancelAtPeriodEnd = false,
      customerID = '',
      freeTransactionCount = 0,
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

  const redirectToCustomerSubscriptionPortal = async () => {
    const onPortalCreateSuccess = (response) => {
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    };
    const onPortalCreateError = (error) => {
      console.log('ERROR: ', error);
    };
    const data = {
      customerID,
    };
    await StripeService.CreatePortalSession(data, onPortalCreateSuccess, onPortalCreateError);
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
      priceId: 'price_1IrVGhLyeoV8Oq71Y2zcTcHx',
    };
    StripeService.CreateCheckoutSession(data, onCreateSessionSuccess, onCreateSessionError);
  };

  if (!userView) {
    return (
      <div className="loading-icon-container" style={{ height: '100%' }}>
        <Loader
          type="Puff"
          color="#00BFFF"
          height={200}
          width={100}
          timeout={15000}
        />
      </div>
    );
  }

  return (
    <>
      <HeaderLoggedIn />
      <div className="dashboard_body">
        <div className="dashboard_body-left">

          <div className="dashboard_user-banner">
            <p className="dashboard_text-normal dashboard_banner-greeting_text" style={{ padding: '70px 0px 15px 50px', margin: '0px' }}>{`${!id ? `${greeting},` : ''}`}</p>
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
              {!id && (freeTransactionCount && freeTransactionCount > 0) ? (
                <p className="dashboard_text-light" style={{ padding: '5px 0px 0px 70px', margin: '0px' }}>
                  {`Transaction Count: ${freeTransactionCount}`}
                </p>

              ) : null}

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
          <div className="dashboard_payment-panel">

            <div className="dashboard_payment-panel-card_icon" />
            <div className="dashboard_payment-panel-text_container">
              <p className="dashboard_text-light" style={{ margin: '0px 0px 10px 0px' }}>
                {isSubscriptionActive && subscriptionExpiry && !subscriptionCancelAtPeriodEnd && (
                  `Renewal: ${moment(subscriptionExpiry).format('MMM Do YYYY')}`
                )}
                {!isSubscriptionActive && !subscriptionCancelAtPeriodEnd && (
                  'Renewal: Inactive'
                )}
                {subscriptionCancelAtPeriodEnd && (
                  `Cancelled: ${moment(subscriptionExpiry).format('MMM Do YYYY')}`
                )}
              </p>
              <p className="dashboard_text-light" style={{ margin: '0px 0px 10px 0px' }}>
                {`${cardBrand ? cardBrand.toUpperCase() : ''} ${cardLastFour || '••••'}`}
              </p>
              <a
                className="dashboard_link_text-normal"
                role="button"
                tabIndex={0}
                aria-label="Home page header"
                aria-hidden="true"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (isSubscriptionActive) {
                    redirectToCustomerSubscriptionPortal();
                  } else {
                    handleCreateNewSubscription();
                  }
                }}
              >
                Manage Subscription ⇾
              </a>
            </div>
          </div>
          )}

          {!id && (
          <div className="dashboard_droplets_panel">
            <div className="dashboard_droplets_panel-header">
              <p className="dashboard_text-normal">Droplets</p>
              <a
                href={dropletsRedeemUrl}
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
          )}

          <div className={`dashboard_most-transacted_panel ${!showTransactions && id && 'blur'}`}>
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
};

export default DashboardUser;
