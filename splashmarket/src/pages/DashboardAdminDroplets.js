import './Dashboard.css'

import HeaderLoggedIn from '../components/header/headerLoggedIn'
import Footer from '../components/footer/footer'

import DashboardDropletsAdminPanel from '../components/panels/DashboardDropletsAdminPanel'

import PageSwitch from '../components/page-switch/PageSwitch'


/*
droplets           -str

*/

function DashboardAdminDroplets(props) {
    return(
        <>
            <HeaderLoggedIn />

            <div className="dashboard_droplets_redeem-header">
                <div className="dashboard_droplets_redeem-header_text">
                    <h3 className="dashboard_text-normal">Edit Prizes</h3>
                    <p className="dashboard_text-light" style={{margin:"5px 0px"}}>Add and delete prizes</p>
                </div>

                <div className="dashboard_droplets_redeem-edit_btns">
                    <div className="dashboard_droplets_redeem-edit_add_btn">
                        <span className="dashboard_droplets_redeem-edit_btn-text">Add Prize</span>
                    </div>

                    <div className="dashboard_droplets_redeem-edit_delete_btn">
                        <span className="dashboard_droplets_redeem-edit_btn-text">Delete All</span>
                    </div>           
                </div>

            </div>

            <div className="dashboard_droplets_redeem-panel_container">
                <DashboardDropletsAdminPanel title="SplashX"/>
                <DashboardDropletsAdminPanel title="SplashX"/>
                <DashboardDropletsAdminPanel title="SplashX"/>
                <DashboardDropletsAdminPanel title="SplashX"/>
                <DashboardDropletsAdminPanel title="SplashX"/>
                <DashboardDropletsAdminPanel title="SplashX"/>
            </div>

            <PageSwitch />
            <Footer />
        </>
    )

}

export default DashboardAdminDroplets;