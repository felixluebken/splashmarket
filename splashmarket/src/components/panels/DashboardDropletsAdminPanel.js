import './panels.css'


/*

iconUrl         -str (url of the icon)
title           -str
subtitle        -str
cost            -str

moreInfoUrl     -str

*/

function DashboardDropletsAdminPanel(props) {
    return(
        <div className="dashboard_droplets-panel">
            <div className="dashboard_droplets-panel_header">
                <div className="dashboard_droplets-panel_header-icon"></div>
                <h3 className="panel_text-normal">{props.title}</h3>
                <div className="dashboard_droplets-panel_header-delete"></div>
            </div>

            <input type="text" className="dashboard_droplets-name_edit" placeholder="Item Name">{props.subtitle}</input>

            <div className="dashboard_droplets-cost">
                <div className="dashboard_droplets-cost_icon_container">
                    <div className="dashboard_droplets-cost_icon"></div>
                </div>
                <div className="dashboard_droplets-cost_text">
                    <input type="number" className="dashboard_droplets-cost_edit" placeholder="Droplet Cost">{props.cost}</input>
                </div>
            </div>

            <div className="dashboard_droplets-btn_container-admin">
                <a href={props.moreInfoUrl}>
                    <div className="dashboard_droplets-more_info-btn">
                        <span className="dashboard_droplets-more_info-btn-text">More Info</span>
                    </div>
                </a>
                
                <div className="dashboard_droplets-redeem-btn">
                    <span className="dashboard_droplets-redeem-btn-text">Save</span>
                </div>



            </div>
        </div>
    )
}

export default DashboardDropletsAdminPanel;