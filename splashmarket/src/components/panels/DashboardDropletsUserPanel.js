import './panels.css'


/*

iconUrl         -str (url of the icon)
title           -str
subtitle        -str
cost            -str

moreInfoUrl     -str
redeemUrl       -str
notEnough       -str true or false

*/

function DashboardDropletsUserPanel(props) {
    return(
        <div className="dashboard_droplets-panel">
            <div className="dashboard_droplets-panel_header">
                <div className="dashboard_droplets-panel_header-icon"></div>
                <h3 className="panel_text-normal">{props.title}</h3>
            </div>

            <p className="panel_text-normal" style={{margin:"10px 20px"}}>{props.subtitle}</p>

            <div className="dashboard_droplets-cost">
                <div className="dashboard_droplets-cost_icon_container">
                    <div className="dashboard_droplets-cost_icon"></div>
                </div>
                <div className="dashboard_droplets-cost_text">
                    <p className="panel_text-normal-small">Droplet Cost</p>
                    <p className="panel_text-normal">{props.cost} Droplets</p>
                </div>
            </div>

            <div className="dashboard_droplets-btn_container">
                <a href={props.moreInfoUrl}>
                    <div className="dashboard_droplets-more_info-btn">
                        <span className="dashboard_droplets-more_info-btn-text">More Info</span>
                    </div>
                </a>

                {(() => {
                    if (props.notEnough === 'true') {
                        return(
                            <div className="dashboard_droplets-not_enough-btn">
                                <span className="dashboard_droplets-not_enough-btn-text">Not enough</span>
                            </div>
                        )
                    } 
                    else {
                        return(
                            <a href={props.redeemUrl}>
                                <div className="dashboard_droplets-redeem-btn">
                                    <span className="dashboard_droplets-redeem-btn-text">Redeem</span>
                                </div>
                            </a>
                        )
                    }
                })()}


            </div>
        </div>
    )
}

export default DashboardDropletsUserPanel;