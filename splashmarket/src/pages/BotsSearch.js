import './Bots.css'


import HeaderBots from '../components/header/headerBots'
import Footer from '../components/footer/footer'

import PageSwitch from '../components/page-switch/PageSwitch'


import BotPanel from '../components/panels/BotPanel'

/*
currentResults          -str
totalResults            -str

*/
function BotsSearch(props) {
    return(
        <>
            <div className="bots_header-container">
                <HeaderBots />
                <div className="bots_header-container_banner">
                    <h3 className="bots_title">Stock market for bots.</h3>
                </div>
            </div>

            <div className="bots_search-frame">
                <div className="bots_search-main_frame">
                    <div className="search_icon"></div>
                    <input className="bots_search" type="text" placeholder="Search bots..."></input>
                </div>
                <div className="bots_search-btn">
                    <span className="bots_search-btn_text">Search</span>
                </div>
            </div>

            <div className="bots_search_results-container">
                <p className="panel_text-light">Showing {props.currentResults} of {props.totalResults} bots</p>
            </div>


            <div className="bots_panel-container">
                <BotPanel name="Cybersole" lowestAsk="$7000" highestOffer="$7532" lastTransactionPrice="$7000" lastTransactionType="Rental" panelBackground="#AEF359"/>
                <BotPanel name="Cybersole" lowestAsk="$7000" highestOffer="$7532" lastTransactionPrice="$7000" lastTransactionType="Rental" panelBackground="#AEF359"/>
                <BotPanel name="Cybersole" lowestAsk="$7000" highestOffer="$7532" lastTransactionPrice="$7000" lastTransactionType="Rental" panelBackground="#AEF359"/>
                <BotPanel name="Cybersole" lowestAsk="$7000" highestOffer="$7532" lastTransactionPrice="$7000" lastTransactionType="Rental" panelBackground="#AEF359"/>
                <BotPanel name="Cybersole" lowestAsk="$7000" highestOffer="$7532" lastTransactionPrice="$7000" lastTransactionType="Rental" panelBackground="#AEF359"/>
                <BotPanel name="Cybersole" lowestAsk="$7000" highestOffer="$7532" lastTransactionPrice="$7000" lastTransactionType="Rental" panelBackground="#AEF359"/>
                <BotPanel name="Cybersole" lowestAsk="$7000" highestOffer="$7532" lastTransactionPrice="$7000" lastTransactionType="Rental" panelBackground="#AEF359"/>
                <BotPanel name="Cybersole" lowestAsk="$7000" highestOffer="$7532" lastTransactionPrice="$7000" lastTransactionType="Rental" panelBackground="#AEF359"/>
                <BotPanel name="Cybersole" lowestAsk="$7000" highestOffer="$7532" lastTransactionPrice="$7000" lastTransactionType="Rental" panelBackground="#AEF359"/>
                <BotPanel name="Cybersole" lowestAsk="$7000" highestOffer="$7532" lastTransactionPrice="$7000" lastTransactionType="Rental" panelBackground="#AEF359"/>
                <BotPanel name="Cybersole" lowestAsk="$7000" highestOffer="$7532" lastTransactionPrice="$7000" lastTransactionType="Rental" panelBackground="#AEF359"/>
                <BotPanel name="Cybersole" lowestAsk="$7000" highestOffer="$7532" lastTransactionPrice="$7000" lastTransactionType="Rental" panelBackground="#AEF359"/>
                <BotPanel name="Cybersole" lowestAsk="$7000" highestOffer="$7532" lastTransactionPrice="$7000" lastTransactionType="Rental" panelBackground="#AEF359"/>
                <BotPanel name="Cybersole" lowestAsk="$7000" highestOffer="$7532" lastTransactionPrice="$7000" lastTransactionType="Rental" panelBackground="#AEF359"/>
                <BotPanel name="Cybersole" lowestAsk="$7000" highestOffer="$7532" lastTransactionPrice="$7000" lastTransactionType="Rental" panelBackground="#AEF359"/>
            </div>

            <PageSwitch />
            <Footer />
        </>
    )
}

export default BotsSearch;