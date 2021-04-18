import './Guides.css'


import HeaderGuide from '../components/header/headerGuide'
import Footer from '../components/footer/footer'

import PageSwitch from '../components/page-switch/PageSwitch'

import GuideBotPanel from '../components/panels/GuideBotPanelUser'

/*
currentResults          -str
totalResults            -str

*/





function Guides(props) {
    return(
        <>
            <div className="guides_header-container">
                <HeaderGuide />
                <div className="guides_header-container_banner">
                    <h3 className="guides_title">Bot information & guides</h3>
                </div>
            </div>
            
            <div className="search-frame_guides">
                <div className="search_icon"></div>
                <input className="guides_search" placeholder="Search Members..." style={{margin:"20px 0px"}}></input>
                <div className="search_divider" style={{margin:"15px 10px"}}></div>
                <div className="filter_icon" style={{margin:"20px 10px"}}></div>
                <select className="guides_filter" style={{margin:"21px 0px"}}>
                    <option>Filter...</option>
                    <option>1</option>
                    <option>2</option>
                </select>
                <div className="blue_button-search" style={{margin:"15px"}}>
                    <span className="blue_button-search-text">Search</span>
                </div>
            </div>

            <div className="guides_search_results-container">
                <p className="panel_text-light">Showing {props.currentResults} of {props.totalResults} bots</p>
            </div>

            <div className="guides_panel-container">
                <GuideBotPanel iconBackgroundColor="green" botName="Cybersole" guideUrl="https://google.com"/>
                <GuideBotPanel iconBackgroundColor="green" botName="Cybersole"/>
                <GuideBotPanel iconBackgroundColor="green" botName="Cybersole"/>
                <GuideBotPanel iconBackgroundColor="green" botName="Cybersole"/>
                <GuideBotPanel iconBackgroundColor="green" botName="Cybersole"/>
                <GuideBotPanel iconBackgroundColor="green" botName="Cybersole"/>
                <GuideBotPanel iconBackgroundColor="green" botName="Cybersole"/>
                <GuideBotPanel iconBackgroundColor="green" botName="Cybersole"/>
                <GuideBotPanel iconBackgroundColor="green" botName="Cybersole"/>
                <GuideBotPanel iconBackgroundColor="green" botName="Cybersole"/>
                <GuideBotPanel iconBackgroundColor="green" botName="Cybersole"/>
            </div>

            <PageSwitch />

            <Footer />
        </>
    )
}
export default Guides;