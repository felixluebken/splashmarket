/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react';
import './panels.css';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import RedeemDropletsPopup from '../../popups/RedeemDropletsPopup';
import { UserContext } from '../../context/UserContext';

const DashboardDropletsUserPanel = (props) => {
  const {
    droplet, droplets, setDroplets, currency,
  } = props;
  const [user] = useContext(UserContext);
  const [canRedeem, setCanRedeem] = useState(false);
  const [isOnRedeemCooldown, setIsOnRedeemCooldown] = useState(false);
  const [hasEnoughCurrency, setHasEnoughCurrency] = useState(false);
  const [redemptionDate, setRedemptionDate] = useState('');
  const [companyIcon, setCompanyIcon] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const history = useHistory();

  const handleToggleRedeemPopup = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    if (droplet.fileContents && droplet.fileContents.buffer) {
      // eslint-disable-next-line new-cap
      const img = new Buffer.from(droplet.fileContents.buffer).toString('base64');
      const imgURL = `data:image/png;base64,${img}`;
      setCompanyIcon(imgURL);
    }

    if (currency) {
      setHasEnoughCurrency(parseInt(currency, 10) >= parseInt(droplet.price, 10));
    } else {
      setHasEnoughCurrency(false);
    }
  }, [currency]);

  useEffect(() => {
    // Can only redeem if they have an active subscription
    if (user.subscriptionExpiry) {
      setCanRedeem(moment().isSameOrBefore(moment(user.subscriptionExpiry)));
    } else {
      setCanRedeem(false);
    }

    // isOnRedeemCooldown checks if a droplet has a redeem cooldown. Checks if user has redeemed within a certain period of time and disables until that cooldown has been exhausted
    if (droplet.redeemInterval && user.dropletsRedeemed && Object.keys(user.dropletsRedeemed).length) {
      // get redeemCooldown from user
      const redeemObject = user.dropletsRedeemed[droplet._id];
      // If there's no redeem cooldown, then they have not redeemed yet
      if (!redeemObject) {
        setIsOnRedeemCooldown(false);
        return;
      }
      // add the redeem interval to the redeemed date
      const nextRedemptionDate = moment(redeemObject.redeemed).add(droplet.redeemInterval, 'days');
      setRedemptionDate(nextRedemptionDate);
      // check if date now is past nextRedemptionDate to see if you can redeem again
      if (moment() >= nextRedemptionDate) {
        setIsOnRedeemCooldown(false);
      } else {
        setIsOnRedeemCooldown(true);
      }
    } else {
      setIsOnRedeemCooldown(false);
    }
  }, [user]);

  return (
    <div className="dashboard_droplets-panel">
      {isModalVisible && (
      <RedeemDropletsPopup title={droplet.prize} company={droplet.company} handleToggleRedeemPopup={handleToggleRedeemPopup} price={droplet.price} currency={currency} id={droplet._id} webhookURL={droplet.webhookURL} roleID={droplet.roleID} isOnRedeemCooldown={isOnRedeemCooldown} redemptionDate={redemptionDate} />
      )}
      <div className="dashboard_droplets-panel_header">
        <div className="dashboard_droplets-panel_header-icon" style={{ backgroundImage: `url(${companyIcon})` }} />
        <h3 className="panel_text-normal">{droplet.company}</h3>
      </div>

      <p className="panel_text-normal" style={{ margin: '10px 20px' }}>{droplet.prize}</p>

      <div className="dashboard_droplets-cost">
        <div className="dashboard_droplets-cost_icon_container">
          <div className="dashboard_droplets-cost_icon" />
        </div>
        <div className="dashboard_droplets-cost_text">
          <p className="panel_text-normal-small">Droplet Cost</p>
          <p className="panel_text-normal">
            {`${droplet.price} Droplets`}

          </p>
        </div>
      </div>

      <div className="dashboard_droplets-btn_container">
        <div
          className="dashboard_droplets-more_info-btn"
          role="button"
          tabIndex={0}
          aria-label="Home page header"
          aria-hidden="true"
          onClick={() => {
            history.push(`/droplets/${droplet._id}`);
          }}
        >
          <span className="dashboard_droplets-more_info-btn-text">More Info</span>
        </div>

        {canRedeem && hasEnoughCurrency ? (
          <div className="dashboard_droplets-redeem-btn">
            <span
              className="dashboard_droplets-redeem-btn-text"
              role="button"
              tabIndex={0}
              aria-label="Home page header"
              aria-hidden="true"
              onClick={() => {
                handleToggleRedeemPopup();
              }}
            >
              Redeem

            </span>
          </div>
        ) : (
          <div className="dashboard_droplets-not_enough-btn">
            <span className="dashboard_droplets-not_enough-btn-text">
              {!canRedeem && 'Subscribe to Redeem'}
              {canRedeem && !hasEnoughCurrency && 'Not enough'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardDropletsUserPanel;
