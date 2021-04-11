import './Dashboard.css'

import HeaderLoggedIn from '../components/header/headerLoggedIn'
import Footer from '../components/footer/footer'

import DashboardDropletsUserPanel from '../components/panels/DashboardDropletsUserPanel'

import PageSwitch from '../components/page-switch/PageSwitch'


/*
droplets           -str

*/

function DashboardUserDroplets(props) {
    return(
        <>
            <HeaderLoggedIn />

            <div className="dashboard_droplets_redeem-header">
                <div className="dashboard_droplets_redeem-header_text">
                    <h3 className="dashboard_text-normal">Redeem Droplets</h3>
                    <p className="dashboard_text-light" style={{margin:"5px 0px"}}>Redeem a wide range of prizes using your droplets</p>
                </div>

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

            <div className="dashboard_droplets_redeem-panel_container">
                <DashboardDropletsUserPanel title="SplashX" subtitle="Splash X Tools" cost="8" moreInfoUrl="https://google.com" notEnough="true"/>
                <DashboardDropletsUserPanel title="SplashX" subtitle="Splash X Tools" cost="8" moreInfoUrl="https://google.com" notEnough="false"/>
                <DashboardDropletsUserPanel title="SplashX" subtitle="Splash X Tools" cost="8" moreInfoUrl="https://google.com" notEnough="false"/>
                <DashboardDropletsUserPanel title="SplashX" subtitle="Splash X Tools" cost="8" moreInfoUrl="https://google.com" notEnough="true"/>
                <DashboardDropletsUserPanel title="SplashX" subtitle="Splash X Tools" cost="8" moreInfoUrl="https://google.com" notEnough="true"/>
                <DashboardDropletsUserPanel title="SplashX" subtitle="Splash X Tools" cost="8" moreInfoUrl="https://google.com" notEnough="true"/>
            
            </div>

            <PageSwitch />
            <Footer />
        </>
    )

}

export default DashboardUserDroplets;