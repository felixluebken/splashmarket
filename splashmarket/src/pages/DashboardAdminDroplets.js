import React, { useEffect, useState } from 'react';
import './Dashboard.css';

import HeaderLoggedIn from '../components/header/headerLoggedIn';
import Footer from '../components/footer/footer';

import DashboardDropletsAdminPanel from '../components/panels/DashboardDropletsAdminPanel';

import PageSwitch from '../components/page-switch/PageSwitch';
import DropletsAdminAddPopup from '../popups/DropletsAdminAddPopup';
import DropletService from '../services/DropletService';

/*
droplets           -str

*/

const DashboardAdminDroplets = (props) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [droplets, setDroplets] = useState([]);
  const [pager, setPager] = useState();
  const handleTogglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const onGetDropletsSuccess = (response) => {
    const { data } = response;

    setDroplets(data.pageOfItems);
    setPager(data.pager);
  };

  const onGetDropletsError = (error) => {
    console.log('ERROR GETTING DROPLETS: ', error.response);
  };

  const getAllDroplets = async (page) => {
    await DropletService.GetDroplets(page, onGetDropletsSuccess, onGetDropletsError);
  };

  useEffect(() => {
    getAllDroplets();
  }, []);

  return (
    <>
      <HeaderLoggedIn />
      {isPopupVisible && (
      <DropletsAdminAddPopup handleTogglePopup={handleTogglePopup} getAllDroplets={getAllDroplets} />
      )}
      <div className="dashboard_droplets_redeem-header">
        <div className="dashboard_droplets_redeem-header_text">
          <h3 className="dashboard_text-normal">Edit Prizes</h3>
          <p className="dashboard_text-light" style={{ margin: '5px 0px' }}>Add and delete prizes</p>
        </div>

        <div className="dashboard_droplets_redeem-edit_btns">
          <div
            className="dashboard_droplets_redeem-edit_add_btn"
            role="button"
            tabIndex={0}
            aria-label="Home page header"
            aria-hidden="true"
            onClick={() => {
              handleTogglePopup();
            }}
          >
            <span
              className="dashboard_droplets_redeem-edit_btn-text"

            >
              Add Prize

            </span>
          </div>

          <div className="dashboard_droplets_redeem-edit_delete_btn">
            <span className="dashboard_droplets_redeem-edit_btn-text">Delete All</span>
          </div>
        </div>

      </div>

      <div className="dashboard_droplets_redeem-panel_container">
        {droplets.map((droplet) => (
          <DashboardDropletsAdminPanel droplet={droplet} droplets={droplets} setDroplets={setDroplets} />
        ))}

      </div>

      <PageSwitch />
      <Footer />
    </>
  );
};

export default DashboardAdminDroplets;
