/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import './panels.css';
import { useHistory } from 'react-router-dom';
/*

iconUrl         -str (url of the icon)
title           -str
subtitle        -str
cost            -str

moreInfoUrl     -str
redeemUrl       -str
notEnough       -str true or false

*/

const DashboardDropletsUserPanel = (props) => {
  const {
    droplet, droplets, setDroplets, currency,
  } = props;

  const [hasEnoughCurrency, setHasEnoughCurrency] = useState(false);
  const [companyIcon, setCompanyIcon] = useState('');
  const history = useHistory();

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
  }, []);

  return (
    <div className="dashboard_droplets-panel">
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

        {hasEnoughCurrency ? (
          <div className="dashboard_droplets-redeem-btn">
            <span className="dashboard_droplets-redeem-btn-text">Redeem</span>
          </div>
        ) : (
          <div className="dashboard_droplets-not_enough-btn">
            <span className="dashboard_droplets-not_enough-btn-text">Not enough</span>
          </div>
        )}
        {/* {(() => {
          if (hasEnoughCurrency) {
            return (

            );
          }

          return (
            <div className="dashboard_droplets-redeem-btn">
              <span className="dashboard_droplets-redeem-btn-text">Redeem</span>
            </div>
          );
        })()} */}

      </div>
    </div>
  );
};

export default DashboardDropletsUserPanel;
