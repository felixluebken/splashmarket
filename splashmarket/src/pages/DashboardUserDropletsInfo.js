import './Dashboard.css'

import HeaderLoggedIn from '../components/header/headerLoggedIn'
import Footer from '../components/footer/footer'



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
    return(
        <>
            <HeaderLoggedIn />

            <div className="dashboard_droplets_info-header">
                <div className="dashboard_droplets_redeem-header_balance">
                    <div className="dashboard_droplets_redeem-header_droplets-body">
                        <div className="dashboard_droplets_panel-icon_container">
                            <div className="dashboard_droplets_panel-icon"></div>
                        </div>

                        <div className="dashboard_droplets_panel-text_container">
                            <p className="dashboard_text-light" style={{margin:"5px 0px"}}>Your current balance</p>
                            <h4 className="dashboard_text-normal" style={{margin:"5px 0px"}}>{props.droplets} Droplets</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard_droplets_info-panel">

                <div className="dashboard_droplets_info-panel_header">
                    <div className="dashboard_droplets_info-panel_header_left">
                        <div className="dashboard_droplets_info-panel_header-icon" style={{backgroundImage:`url(${props.iconUrl})`}}></div>
                        <p className="dashboard_droplets_info-panel_header-text">{props.title}</p>
                    </div>

                    <div className="dashboard_droplets-cost">
                        <div className="dashboard_droplets-cost_icon_container">
                            <div className="dashboard_droplets-cost_icon"></div>
                        </div>
                        <div className="dashboard_droplets-cost_text">
                            <p className="panel_text-normal-small">Droplet Cost</p>
                            <p className="panel_text-normal">{props.cost} Droplets</p>
                        </div>
                    </div>
                </div>
                
                <div className="dashboard_droplets_info-panel_body">

                    <h3 className="dashboard_text-normal">{props.mainTitle}</h3>

                    <p className="dashboard_text-light" style={{marginTop:"30px"}}>What is {props.title}?</p>
                    <p className="dashboard_text-normal" style={{margin:"0",lineHeight:"26px"}}>{props.description}</p>

                    <p className="dashboard_text-light" style={{marginTop:"30px"}}>What is the prize?</p>
                    <p className="dashboard_text-normal" style={{margin:"0",lineHeight:"26px"}}>{props.prizeDescription}</p>
                    

                </div>


            </div>

            <Footer />
        </>
    )

}

export default DashboardUserDropletsInfo;