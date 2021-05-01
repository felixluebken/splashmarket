import './Guides.css'


import HeaderGuide from '../components/header/headerGuide'
import Footer from '../components/footer/footer'

import PageSwitch from '../components/page-switch/PageSwitch'
import SearchPhrasePanel from '../components/small-panels/searchPhrases'

import GuideBotPanel from '../components/panels/GuideBotPanelUser'

/*
currentResults          -str
totalResults            -str

*/





function GuidesSearch(props) {
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



            <div className="guides_panel-container">
                <div className="guides_search-current_search">
                    <div className="guides_search-current_search-terms-container">
                        <p className="text-normal">Current Search</p>
                        <div className="guides_search-current_search-terms">
                            <SearchPhrasePanel searchTerm="Shopify"/>
                            <SearchPhrasePanel searchTerm="Mesh"/>
                        </div>
                    </div>

                    <div className="guides_search-current_search-categories-container">
                        <p className="text-normal" style={{marginBottom:"20px"}}>Refine by categories</p>

                        <div class="checkbox-container">
                            <input type="checkbox" className="checkbox"/>
                            <p className="text-light-small" style={{margin:"3px 0px 0px 0px"}}>Shopify</p>
                        </div>

                        <div class="checkbox-container">
                            <input type="checkbox" className="checkbox"/>
                            <p className="text-light-small" style={{margin:"3px 0px 0px 0px"}}>Mesh</p>
                        </div>

                        <div class="checkbox-container">
                            <input type="checkbox" className="checkbox"/>
                            <p className="text-light-small" style={{margin:"3px 0px 0px 0px"}}>Foot sites</p>
                        </div>

                        <div class="checkbox-container">
                            <input type="checkbox" className="checkbox"/>
                            <p className="text-light-small" style={{margin:"3px 0px 0px 0px"}}>Off white</p>
                        </div>
                        
                        <div class="checkbox-container">
                            <input type="checkbox" className="checkbox"/>
                            <p className="text-light-small" style={{margin:"3px 0px 0px 0px"}}>Amazon</p>
                        </div>
                    
                        <div class="checkbox-container">
                            <input type="checkbox" className="checkbox"/>
                            <p className="text-light-small" style={{margin:"3px 0px 0px 0px"}}>Target</p>
                        </div>

                        <div class="checkbox-container">
                            <input type="checkbox" className="checkbox"/>
                            <p className="text-light-small" style={{margin:"3px 0px 0px 0px"}}>Walmart</p>
                        </div>

                        <div class="checkbox-container">
                            <input type="checkbox" className="checkbox"/>
                            <p className="text-light-small" style={{margin:"3px 0px 0px 0px"}}>Yeezysupply</p>
                        </div>
                    </div>

                </div>

                <div className="guides_search-results">
                    <div className="guides_search_results-container" style={{margin:"20px 0px 10px 0px"}}>
                        <p className="panel_text-light">Showing {props.currentResults} of {props.totalResults} bots</p>
                    </div>
                    <div class="guides_search-results-container">
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
                    
                </div>

            </div>

            <PageSwitch />

            <Footer />
        </>
    )
}
export default GuidesSearch;