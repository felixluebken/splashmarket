import React, { useContext, useEffect, useState } from 'react';
import {
  Formik,
} from 'formik';
import { useHistory, useParams } from 'react-router-dom';
import './Dashboard.css';
import HeaderLoggedIn from '../components/header/headerLoggedIn';
import Footer from '../components/footer/footer';
import { UserContext } from '../context/UserContext';
import DropletService from '../services/DropletService';
import { dropletValidationSchema } from '../helpers/validationSchema';
import { enforceNumber } from '../helpers/helpers';

/*
droplets            -str
title               -str
iconUrl             -str url icon
cost                -str

mainTitle           -str
description         -str
prizeDescription    -str

*/

function DashboardAdminDropletsInfo() {
  const { id } = useParams();
  const [user] = useContext(UserContext);
  const [droplet, setDroplet] = useState({});
  const [saved, setSaved] = useState(false);
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

  useEffect(() => {
    if (saved) {
      setTimeout(() => {
        setSaved(false);
      }, 5000);
    }
  }, [saved]);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  const onDropletUpdateSuccess = () => {
    console.log('UPDATED SUCCESSFULLY');
    setSaved(true);
  };

  const onDropletUpdateError = (error) => {
    console.log('ERROR: ', error.response);
  };

  const handleSubmit = (values, validateForm) => {
    validateForm().then(async (errors) => {
      console.log('ERRORS: ', errors);
      if (!errors.roleID && !errors.webhookURL && !errors.companyDescription && !errors.prizeDescription) {
        const putData = {
          roleID: values.roleID,
          webhookURL: values.webhookURL,
          companyDescription: values.companyDescription,
          prizeDescription: values.prizeDescription,

        };
        const { _id } = values;
        console.log('ID: ', id);
        console.log('PUT DATA: ', putData);
        await DropletService.UpdateDroplet(_id, putData, onDropletUpdateSuccess, onDropletUpdateError);
      }
    });
  };

  const handleBlur = (validateField) => (event) => {
    validateField(event.target.name);
  };

  return (
    <>
      <HeaderLoggedIn />
      <Formik
        validationSchema={dropletValidationSchema}
        onSubmit={(event) => {
          event.preventDefault();
        }}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{ ...droplet }}
      >
        {({
          errors,
          handleChange,
          values,
          validateField,
          validateForm,
        }) => {
          console.log('VALUES: ', values);
          const {
            prize, companyDescription, company, prizeDescription, webhookURL, roleID,
          } = values;
          return (
            <>
              <div className="dashboard_droplets_info-header">
                <div className="dashboard_droplets_redeem-header_balance">
                  <div className="dashboard_droplets_redeem-header_droplets-body">
                    <div className="dashboard_droplets_panel-icon_container">
                      <div className="dashboard_droplets_panel-icon" />
                    </div>

                    <div className="dashboard_droplets_panel-text_container">
                      <p className="dashboard_text-light" style={{ margin: '5px 0px' }}>Your current balance</p>
                      <h4 className="dashboard_text-normal" style={{ margin: '5px 0px' }}>
                        {currency}
                        {' '}
                        Droplets
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dashboard_droplets_info-panel">

                <div className="dashboard_droplets_info-panel_header">
                  <div className="dashboard_droplets_info-panel_header_left">
                    <div className="dashboard_droplets_info-panel_header-icon" style={{ backgroundImage: `url(${iconUrl})` }} />
                    <p className="dashboard_droplets_info-panel_header-text">{droplet.company}</p>
                  </div>

                  <div className="dashboard_droplets-cost">
                    <div className="dashboard_droplets-cost_icon_container">
                      <div className="dashboard_droplets-cost_icon" />
                    </div>
                    <div className="dashboard_droplets-cost_text">
                      <p className="panel_text-normal-small">Droplet Cost</p>
                      <p className="panel_text-normal">
                        {droplet.price}
                        {' '}
                        Droplets
                      </p>
                    </div>
                  </div>
                </div>

                <div className="dashboard_droplets_info-panel_body">

                  <h3 className="dashboard_text-normal">{droplet.prize}</h3>

                  <div className="dashboard_droplets_info-panel_body_admin-container">
                    <div className="dashboard_droplets_info-panel_body_admin">
                      <p className="dashboard_text-light" style={{ marginTop: '30px' }}>
                        Role ID
                      </p>
                      <input type="text" name="roleID" className={`dashboard_text-input ${errors.roleID && 'invalid-input'}`} value={roleID} onChange={handleChange} onBlur={handleBlur(validateField)} onKeyDown={enforceNumber} />
                    </div>

                    <div className="dashboard_droplets_info-panel_body_admin">
                      <p className="dashboard_text-light" style={{ marginTop: '30px' }}>
                        Webhook URL
                      </p>
                      <input type="text" name="webhookURL" className={`dashboard_text-input ${errors.webhookURL && 'invalid-input'}`} value={webhookURL} onChange={handleChange} onBlur={handleBlur(validateField)} />
                    </div>
                  </div>

                  <div className="dashboard_droplets_info-panel_body_admin-container">
                    <div className="dashboard_droplets_info-panel_body_admin">
                      <p className="dashboard_text-light" style={{ marginTop: '30px' }}>
                        What is
                        {' '}
                        {droplet.company}
                        ?
                      </p>
                      <textarea name="companyDescription" className={`dashboard_text-area ${errors.companyDescription && 'invalid-input'}`} value={companyDescription} onChange={handleChange} onBlur={handleBlur(validateField)} />
                    </div>

                    <div className="dashboard_droplets_info-panel_body_admin">
                      <p className="dashboard_text-light" style={{ marginTop: '30px' }}>
                        What is
                        {' '}
                        {droplet.prize}
                        ?
                      </p>
                      <textarea name="prizeDescription" className={`dashboard_text-area ${errors.prizeDescription && 'invalid-input'}`} value={prizeDescription} onChange={handleChange} onBlur={handleBlur(validateField)} />
                    </div>
                  </div>

                </div>

                <div className="dashboard_droplets_info-panel_footer_admin-container">

                  <div
                    className={`dashboard_droplets_info-panel_footer_admin-btn ${saved && 'btn-saved'}`}
                    style={{ backgroundColor: saved ? '#5bf97d' : '#29ABFF' }}
                    role="button"
                    tabIndex={0}
                    aria-label="Home page header"
                    aria-hidden="true"
                    onClick={() => {
                      handleSubmit(values, validateForm);
                    }}
                  >
                    <span className="dashboard_droplets_info-panel_footer_admin-btn_text">{saved ? 'Saved!' : 'Save'}</span>
                  </div>

                  <div
                    className="dashboard_droplets_info-panel_footer_admin-btn"
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
                      className="dashboard_droplets_info-panel_footer_admin-btn_text"

                    >
                      Cancel

                    </span>
                  </div>

                </div>
              </div>

            </>
          );
        }}
      </Formik>

      <Footer />
    </>
  );
}

export default DashboardAdminDropletsInfo;
