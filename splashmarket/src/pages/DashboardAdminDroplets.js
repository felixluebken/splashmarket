import React, { useContext, useEffect, useState } from 'react';
import './Dashboard.css';

import HeaderLoggedIn from '../components/header/headerLoggedIn';
import Footer from '../components/footer/footer';

import DashboardDropletsAdminPanel from '../components/panels/DashboardDropletsAdminPanel';

import PageSwitch from '../components/page-switch/PageSwitch';
import DropletsAdminAddPopup from '../popups/DropletsAdminAddPopup';
import DropletService from '../services/DropletService';
import { UserContext } from '../context/UserContext';
import { verifyAdmin } from '../helpers/helpers';
import useQuery from '../helpers/useQuery';

/*
droplets           -str

*/

const DashboardAdminDroplets = (props) => {
  const [user] = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [droplets, setDroplets] = useState([]);
  const [pager, setPager] = useState({});
  const pageQuery = useQuery().get('page') || 1;
  const [currentPage, setCurrentPage] = useState(1);

  const handleTogglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const onGetDropletsSuccess = (response) => {
    const { data } = response;

    setDroplets(data.pageOfItems);
    setPager(data.pager);

    if (data.pager) {
      setCurrentPage(data.pager.currentPage);
    }
  };

  const onGetDropletsError = (error) => {
    console.log('ERROR GETTING DROPLETS: ', error.response);
  };

  const getAllDroplets = async (page) => {
    await DropletService.GetDroplets(page, onGetDropletsSuccess, onGetDropletsError);
  };

  useEffect(() => {
    getAllDroplets(pageQuery);

    // CHANGE
    setIsAdmin(!verifyAdmin(user.role, user.isLoggedIn));
  }, []);

  useEffect(() => {
    getAllDroplets(pageQuery);
  }, [pageQuery]);

  console.log('IS ADMIN: ', isAdmin);

  return (
    <>
      <HeaderLoggedIn />
      {isPopupVisible && (
      <DropletsAdminAddPopup handleTogglePopup={handleTogglePopup} getAllDroplets={getAllDroplets} />
      )}
      <div className="dashboard_droplets_redeem-header">
        <div className="dashboard_droplets_redeem-header_text">
          <h3 className="dashboard_text-normal">
            {isAdmin ? 'Edit Prizes' : 'Redeem a wide range of prizes using your droplets'}
          </h3>
          <p className="dashboard_text-light" style={{ margin: '5px 0px' }}>{isAdmin ? 'Add and delete prizes' : 'Redeem a wide range of prizes using your droplets'}</p>
        </div>

        {isAdmin && (
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
        )}

      </div>

      <div className="dashboard_droplets_redeem-panel_container">
        {droplets.map((droplet) => (
          <DashboardDropletsAdminPanel droplet={droplet} droplets={droplets} setDroplets={setDroplets} isAdmin={isAdmin} />
        ))}

      </div>

      <PageSwitch totalPages={pager.totalPages || 1} currentPage={currentPage || 1} />
      <Footer />
    </>
  );
};

export default DashboardAdminDroplets;
