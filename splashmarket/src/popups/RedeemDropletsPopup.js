import React, { useContext, useEffect, useState } from 'react';
import { SET_USER, UserContext } from '../context/UserContext';
import DiscordService from '../services/DiscordService';
import UserService from '../services/UserService';
import './Popups.css';

const RedeemDropletsPopup = (props) => {
  const {
    title, handleToggleRedeemPopup, company, price, currency, id, webhookURL, roleID,
  } = props;
  const [hasConfirmedRedemption, setHasConfirmedRedemption] = useState(false);
  const [user, userDispatch] = useContext(UserContext);

  const updateUserDroplets = () => {
    const onRedemptionSuccess = () => {
      setHasConfirmedRedemption(true);
      userDispatch({
        type: SET_USER,
        payload: {
          value: { ...user, currency: parseInt(currency, 10) - parseInt(price, 10) },
        },
      });
    };
    const onRedemptionError = (error) => {
      console.log('ERROR: ', error);
    };
    const data = {
      currency: parseInt(currency, 10) - parseInt(price, 10),
    };
    UserService.UpdateUser(user.id, data, onRedemptionSuccess, onRedemptionError);
  };

  const webhookData = {
    username: 'Splash Market Droplets',
    avatar_url: 'https://media.discordapp.net/attachments/697351028307263550/733343318741745684/image0.png?width=589&height=589',
    embeds: [
      {
        description: `<@&${roleID}>Droplet Redeemed by: **${user.username}#${user.discriminator}**`,
        color: 1365503,
        fields: [
          {
            name: 'Droplet Prize',
            value: title || '',
          },
          {
            name: 'Discord User',
            value: `${user.username}#${user.discriminator} - <@${user.id}>` || '',
          },
          {
            name: 'User Email',
            value: user.email || 'N/A',
          },
        ],
        footer: {
          text: 'Powered by Splash Market',
          icon_url: 'https://media.discordapp.net/attachments/697351028307263550/733343318741745684/image0.png?width=589&height=589',
        },
        timestamp: new Date(),
      },
    ],
  };

  const onSendWebhookSuccess = (response) => {
    updateUserDroplets();
  };
  const onSendWebhookError = (error) => {
    console.log('ERROR: ', error.response);
  };

  const handleRedeemPrize = () => {
    DiscordService.SendWebhook(webhookURL, webhookData, onSendWebhookSuccess, onSendWebhookError);
  };
  useEffect(() => () => {
    setHasConfirmedRedemption(false);
  }, []);

  return (
    <div className="popup_panel-small">
      <div className="droplets_redeem_success-header">
        {
          hasConfirmedRedemption && (
            <>
              <div className="party_popper-icon" />
              <h4 className="popup_text-normal">Success!</h4>
            </>
          )
        }

      </div>
      <h3 className="popup_text-normal" style={{ textAlign: 'center' }}>{title}</h3>
      <p className="popup_text-normal" style={{ textAlign: 'center', margin: '30px 5%', width: '90%' }}>
        {hasConfirmedRedemption ? (
          <>
            {`The representatives from ${company} have been notified. Please expect a DM on Discord for redemption instructions soon, or an email sent to ${user.email}.`}
          </>
        )
          : (
            <>
              {`Please confirm that you would like to redeem ${title} from ${company} for ${price} droplets. After the purchase, you will have ${parseInt(currency, 10) - parseInt(price, 10)} droplets remaining.`}
            </>
          )}

      </p>

      <div style={{ display: 'flex' }}>
        <div
          className="popup_red-btn"
          style={{ margin: '10px auto' }}
          role="button"
          tabIndex={0}
          aria-label="Home page header"
          aria-hidden="true"
          onClick={() => {
            handleToggleRedeemPopup();
          }}
        >
          <span
            className="popup_blue-btn_text"
          >
            Back to shop
          </span>
        </div>
        {!hasConfirmedRedemption && (
        <div
          className="popup_blue-btn"
          style={{ margin: '10px auto' }}
          role="button"
          tabIndex={0}
          aria-label="Home page header"
          aria-hidden="true"
          onClick={() => {
            handleRedeemPrize();
          }}
        >
          <span
            className="popup_blue-btn_text"
          >
            Redeem Prize
          </span>
        </div>
        )}

      </div>

    </div>

  );
};

export default RedeemDropletsPopup;
