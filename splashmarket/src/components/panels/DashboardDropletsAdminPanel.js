import React from 'react';
import './panels.css';

/*

iconUrl         -str (url of the icon)
title           -str
subtitle        -str
cost            -str

moreInfoUrl     -str

*/

function DashboardDropletsAdminPanel(props) {
  const {
    title, moreInfoUrl,
    // subtitle, cost,
  } = props;
  return (
    <div className="dashboard_droplets-panel">
      <div className="dashboard_droplets-panel_header">
        <div className="dashboard_droplets-panel_header-icon" />
        <h3 className="panel_text-normal">{title}</h3>
        <div className="dashboard_droplets-panel_header-delete" />
      </div>

      <input type="text" className="dashboard_droplets-name_edit" placeholder="Item Name" />

      <div className="dashboard_droplets-cost">
        <div className="dashboard_droplets-cost_icon_container">
          <div className="dashboard_droplets-cost_icon" />
        </div>
        <div className="dashboard_droplets-cost_text">
          <input type="number" className="dashboard_droplets-cost_edit" placeholder="Droplet Cost" />
        </div>
      </div>

      <div className="dashboard_droplets-btn_container-admin">
        <a href={moreInfoUrl}>
          <div className="dashboard_droplets-more_info-btn">
            <span className="dashboard_droplets-more_info-btn-text">More Info</span>
          </div>
        </a>

        <div className="dashboard_droplets-redeem-btn">
          <span className="dashboard_droplets-redeem-btn-text">Save</span>
        </div>

      </div>
    </div>
  );
}

export default DashboardDropletsAdminPanel;
