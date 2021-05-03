/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  Formik,
} from 'formik';
import { useHistory } from 'react-router-dom';
import { enforceNumber } from '../../helpers/helpers';
import './panels.css';
import { dropletValidationSchema } from '../../helpers/validationSchema';
import DropletService from '../../services/DropletService';
/*

iconUrl         -str (url of the icon)
title           -str
subtitle        -str
cost            -str

moreInfoUrl     -str

*/

function DashboardDropletsAdminPanel(props) {
  const {
    droplet, droplets, setDroplets, isAdmin,
  } = props;

  const initialValues = { ...droplet };

  const [companyIcon, setCompanyIcon] = useState('');
  const [saved, setSaved] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (initialValues.fileContents && initialValues.fileContents.buffer) {
      // eslint-disable-next-line new-cap
      const img = new Buffer.from(initialValues.fileContents.buffer).toString('base64');
      const imgURL = `data:image/png;base64,${img}`;
      setCompanyIcon(imgURL);
    }
  }, []);

  useEffect(() => {
    if (saved) {
      setTimeout(() => {
        setSaved(false);
      }, 5000);
    }
  }, [saved]);

  const onDropletUpdateSuccess = () => {
    console.log('UPDATED SUCCESSFULLY');
    setSaved(true);
  };

  const onDropletUpdateError = (error) => {
    console.log('ERROR: ', error.response);
  };

  const handleSubmit = (values, validateForm) => {
    validateForm().then(async (errors) => {
      if (!errors.price && !errors.prize) {
        const putData = {
          prize: values.prize,
          price: values.price,
        };
        const { _id } = values;

        await DropletService.UpdateDroplet(_id, putData, onDropletUpdateSuccess, onDropletUpdateError);
      }
    });
  };

  const handleDelete = () => {
    const { _id } = droplet;

    const onDeleteDropletSuccess = (response) => {
      const updatedDroplets = droplets.filter((obj) => obj._id !== response.data);
      setDroplets(updatedDroplets);
    };

    const onDeleteDropletError = (error) => {
      console.log('ERROR GETTING DROPLETS: ', error.response);
    };

    DropletService.DeleteDroplet(_id, onDeleteDropletSuccess, onDeleteDropletError);
  };

  const handleBlur = (validateField) => (event) => {
    validateField(event.target.name);
  };

  return (
    <Formik
      validationSchema={dropletValidationSchema}
      onSubmit={(event) => {
        event.preventDefault();
      }}
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={initialValues}
    >
      {({
        errors,
        handleChange,
        values,
        validateField,
        validateForm,
      }) => {
        const {
          prize, price,
        } = values;
        return (
          <div className="dashboard_droplets-panel">
            <div className="dashboard_droplets-panel_header">
              <div className="dashboard_droplets-panel_header-icon" style={{ backgroundImage: `url(${companyIcon})` }} />
              <h3 className="panel_text-normal">{droplet.company}</h3>
              <div
                className="dashboard_droplets-panel_header-delete"
                role="button"
                tabIndex={0}
                aria-label="Home page header"
                aria-hidden="true"
                onClick={handleDelete}
              />
            </div>
            <input name="prize" type="text" className={`dashboard_droplets-name_edit ${errors.prize && 'invalid-input'}`} placeholder="Item Name" value={prize} onChange={handleChange} onBlur={handleBlur(validateField)} />
            <div className="dashboard_droplets-cost">
              <div className="dashboard_droplets-cost_icon_container">
                <div className="dashboard_droplets-cost_icon" />
              </div>
              <div className="dashboard_droplets-cost_text">
                <input name="price" className={`dashboard_droplets-cost_edit ${errors.price && 'invalid-input'}`} style={{ width: '100%' }} placeholder="Droplet Cost" value={price} onChange={handleChange} onBlur={handleBlur(validateField)} onKeyDown={enforceNumber} />
              </div>
            </div>
            <div
              className="dashboard_droplets-btn_container-admin"
            >
              <div
                className="dashboard_droplets-more_info-btn"
                role="button"
                tabIndex={0}
                aria-label="Home page header"
                aria-hidden="true"
                onClick={() => {
                  history.push(`/droplets/${values._id}`);
                }}
              >
                <span
                  className="dashboard_droplets-more_info-btn-text"

                >
                  More Info
                </span>
              </div>
              <div
                className={`dashboard_droplets-redeem-btn ${saved && 'btn-saved'}`}
                role="button"
                tabIndex={0}
                aria-label="Home page header"
                aria-hidden="true"
                onClick={() => {
                  handleSubmit(values, validateForm);
                }}
              >
                <span className="dashboard_droplets-redeem-btn-text">{saved ? 'Saved!' : 'Save'}</span>
              </div>

            </div>
          </div>
        );
      }}
    </Formik>

  );
}

export default DashboardDropletsAdminPanel;
