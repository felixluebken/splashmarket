import React, {
  useContext, useState, useEffect,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './Dashboard.css';
import HeaderLoggedIn from '../components/header/headerLoggedIn';
import Footer from '../components/footer/footer';
import { UserContext } from '../context/UserContext';
import DropletService from '../services/DropletService';

/*
droplets            -str
title               -str
iconUrl             -str url icon
cost                -str

mainTitle           -str
description         -str
prizeDescription    -str

*/

function DashboardUserDropletsInfo(props) {
  const {
    droplets, title, cost, mainTitle, description,
  } = props;
  const [hasEnoughCurrency, setHasEnoughCurrency] = useState(false);

  const { id } = useParams();
  const [user] = useContext(UserContext);
  const [droplet, setDroplet] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [iconUrl, setIconUrl] = useState('');
  const { currency } = user;
  const history = useHistory();

  useEffect(() => {
    const onGetDropletsSuccess = (response) => {
      const { data } = response;

      if (data.fileContents && data.fileContents.buffer) {
        // eslint-disable-next-line new-cap
        const img = new Buffer.from(data.fileContents.buffer).toString('base64');
        const imgURL = `data:image/png;base64,${img}`;
        setIconUrl(imgURL);
      }
      setDroplet(response.data);
      setIsLoading(false);
    };

    const onGetDropletsError = (error) => {
      console.log('ERROR GETTING DROPLETS: ', error.response);
      history.push('/droplets');
    };

    DropletService.GetDroplet(id, onGetDropletsSuccess, onGetDropletsError);
  }, [id]);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  // useEffect(() => {
  //   if (currency) {
  //     setHasEnoughCurrency(parseInt(currency, 10) >= parseInt(droplet.price, 10));
  //   } else {
  //     setHasEnoughCurrency(false);
  //   }
  // }, [currency]);

  const {
    company, companyDescription, price, prize, prizeDescription,
  } = droplet;

  return (
    <>
      <HeaderLoggedIn />

      <div className="dashboard_droplets_info-header">
        <div className="dashboard_droplets_redeem-header_balance">
          <div className="dashboard_droplets_redeem-header_droplets-body">
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
      </div>

      <div className="dashboard_droplets_info-panel">

        <div className="dashboard_droplets_info-panel_header">
          <div className="dashboard_droplets_info-panel_header_left">
            <div className="dashboard_droplets_info-panel_header-icon" style={{ backgroundImage: `url(${iconUrl})` }} />
            <p className="dashboard_droplets_info-panel_header-text">{company}</p>
          </div>

          <div className="dashboard_droplets-cost">
            <div className="dashboard_droplets-cost_icon_container">
              <div className="dashboard_droplets-cost_icon" />
            </div>
            <div className="dashboard_droplets-cost_text">
              <p className="panel_text-normal-small">Droplet Cost</p>
              <p className="panel_text-normal">
                {`${price} Droplets`}
              </p>
            </div>
          </div>
        </div>

        <div className="dashboard_droplets_info-panel_body">

          <h3 className="dashboard_text-normal">{prize}</h3>

          <p className="dashboard_text-light" style={{ marginTop: '30px' }}>
            {`What is ${company}?`}
          </p>
          <p className="dashboard_text-normal" style={{ margin: '0', lineHeight: '26px' }}>{companyDescription}</p>

          <p className="dashboard_text-light" style={{ marginTop: '30px' }}>What is the prize?</p>
          <p className="dashboard_text-normal" style={{ margin: '0', lineHeight: '26px' }}>{prizeDescription}</p>
        </div>
        <div className="dashboard_droplets_info-panel_user-buttons-container">
          <div
            className="dashboard_droplets-info-panel_user-button"
            style={{ backgroundColor: '#FB4056' }}
            role="button"
            tabIndex={0}
            aria-label="Home page header"
            aria-hidden="true"
            onClick={() => {
              history.push('/droplets');
            }}
          >
            <span
              className="dashboard_droplets-redeem-btn-text"
            >
              Back
            </span>
          </div>
          {/* <div className="dashboard_droplets-info-panel_user-button">
            <span className="dashboard_droplets-redeem-btn-text">Redeem Prize</span>
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DashboardUserDropletsInfo;
