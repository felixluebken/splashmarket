import './Dashboard.css'
import HeaderLoggedIn from '../components/header/headerLoggedIn'

import TransactionHistoryPanel from '../components/list-panels/transactionHistory'



/*
PROP PARAMS

dashboardGreeting           -str
username                    -str
avatar                      -str (discord avatar url)
discriminator               -str
transactions                -str
totalSold                   -str
totalPurchased              -str
droplets                    -str
dropletsRedeemUrl           -str (url for redeeming droplets)

manageSubscriptionUrl       -str (url for managing subscriptions)
paymentType                 -str
paymentLast4                -str


MOST TRANSACTED #1
numTransactions1            -str
botName1                    -str
botBackgroundColor1         -str (hex)
botIcon1                    -str (url)
botBarColor1                -str (hex)
botBarPercent1              -str (% of progress)

MOST TRANSACTED #2
numTransactions2            -str
botName2                    -str
botBackgroundColor2         -str (hex)
botIcon2                    -str (url)
botBarColor2                -str (hex)
botBarPercent2              -str (% of progress)

MOST TRANSACTED #3
numTransactions3            -str
botName3                    -str
botBackgroundColor3         -str (hex)
botIcon3                    -str (url)
botBarColor3                -str (hex)
botBarPercent3              -str (% of progress)


*/

function DashboardUser(props) {
    return(
        <>
            <HeaderLoggedIn />
            <div className="dashboard_body">
                <div className="dashboard_body-left">

                    <div className="dashboard_user-banner">
                        <p className="dashboard_text-normal dashboard_banner-greeting_text" style={{padding:"70px 0px 15px 50px",margin:"0px"}}>{props.dashboardGreeting}</p>
                        <div className="dashboard_user">
                            <div className="dashboard_user-profile-pic" style={{backgroundImage:`url(${props.avatar})`}}></div>
                            <p className="dashboard_text-normal" style={{padding:"5px 0px 5px 70px",margin:"0px"}}>{props.username}</p>
                            <p className="dashboard_text-light" style={{padding:"5px 0px 0px 70px",margin:"0px"}}>{props.discriminator}</p>
                        </div>
                    </div>

                    <div className="dashboard_stats-container">

                        <div className="dashboard_stats-panel">
                            <div className="dashboard_stats-icon_container">
                                <div className="dashboard_stats-icon dashboard_stats-icon-transactions"></div>
                            </div>
                            <div className="dashboard_stats-text_container">
                                <h3 className="dashboard_text-normal" style={{margin:"5px 0px 0px 0px"}}>{props.transactions}</h3>
                                <p className="dashboard_text-light" style={{margin:"5px 0px 0px 0px"}}>Transactions</p>
                            </div>
                        </div>

                        <div className="dashboard_stats-panel">
                            <div className="dashboard_stats-icon_container">
                                <div className="dashboard_stats-icon dashboard_stats-icon-sold"></div>
                            </div>
                            <div className="dashboard_stats-text_container">
                                <h3 className="dashboard_text-normal" style={{margin:"5px 0px 0px 0px"}}>{props.totalSold}</h3>
                                <p className="dashboard_text-light" style={{margin:"5px 0px 0px 0px"}}>Total Sold</p>
                            </div>
                        </div>

                        <div className="dashboard_stats-panel">
                            <div className="dashboard_stats-icon_container">
                                <div className="dashboard_stats-icon dashboard_stats-icon-purchased"></div>
                            </div>
                            <div className="dashboard_stats-text_container">
                                <h3 className="dashboard_text-normal" style={{margin:"5px 0px 0px 0px"}}>{props.totalPurchased}</h3>
                                <p className="dashboard_text-light" style={{margin:"5px 0px 0px 0px"}}>Total Purchased</p>
                            </div>
                        </div>

                    </div>

                    <div className="dashboard_transaction-history_panel">
                        <p className="dashboard_text-normal">Transaction History</p>
                        <table>
                            <tr>
                                <th style={{minWidth:"10%"}}>Bot</th>
                                <th>Date</th>
                                <th>Position</th>
                                <th>Other Party</th>
                                <th>Transcript</th>
                            </tr>
                        </table>

                        <div className="dashboard_transaction-history_panel-container">
                            <TransactionHistoryPanel botBackground="black" botIcon="" botName="Cybersole" date="Dec 24, 2020" position="Owner" otherParty="dearchitect#1234" transcriptTitle="Transcript 123" transcriptUrl="https://google.com"/>
                        </div>
                    </div>

                </div>
                <div className="dashboard_body-right">
                    <div className="dashboard_droplets_panel">
                        <div className="dashboard_droplets_panel-header">
                            <p className="dashboard_text-normal">Droplets</p>
                            <a href={props.dropletsRedeemUrl} className="dashboard_link_text-normal">Redeem ???</a>
                        </div>
                        <div className="dashboard_droplets_panel-body">
                            <div className="dashboard_droplets_panel-icon_container">
                                <div className="dashboard_droplets_panel-icon"></div>
                            </div>
                            <div className="dashboard_droplets_panel-text_container">
                                <p className="dashboard_text-light" style={{margin:"5px 0px"}}>Your current balance</p>
                                <h4 className="dashboard_text-normal" style={{margin:"5px 0px"}}>{props.droplets} Droplets</h4>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard_most-transacted_panel">
                        <p className="dashboard_text-normal dashboard_most-transacted_header">Most Transacted Bots</p>
                        <div className="dashboard_most-transacted_bot-section">
                            <div className="dashboard_most-transacted_bot-frame" style={{backgroundColor:`${props.botBackgroundColor1}`}}>
                                <div className="dashboard_most-transacted_bot-icon" style={{backgroundImage:`url(${props.botBackgroundColor1})`}}></div>
                            </div>

                            <div className="dashboard_most-transacted-text_container">
                                <p className="dashboard_text-light-xs" style={{margin:"0"}}>{props.numTransactions1} Transactions</p>
                                <p className="dashboard_text-normal-small" style={{margin:"5px 0px 0px 0px"}}>{props.botName1}</p>
                                <div className="dashboard_most-transacted-bar_container">
                                    <div className="dashboard_most-transacted-bar" style={{backgroundColor:`${props.botBarColor1}`,width:`${props.botBarPercent1}`}}></div>
                                </div>
                            </div>
                        </div>

                        <div className="dashboard_most-transacted_bot-section">
                        <div className="dashboard_most-transacted_bot-frame" style={{backgroundColor:`${props.botBackgroundColor2}`}}>
                                <div className="dashboard_most-transacted_bot-icon" style={{backgroundImage:`url(${props.botBackgroundColor2})`}}></div>
                            </div>

                            <div className="dashboard_most-transacted-text_container">
                                <p className="dashboard_text-light-xs" style={{margin:"0"}}>{props.numTransactions2} Transactions</p>
                                <p className="dashboard_text-normal-small" style={{margin:"5px 0px 0px 0px"}}>{props.botName2}</p>
                                <div className="dashboard_most-transacted-bar_container">
                                    <div className="dashboard_most-transacted-bar" style={{backgroundColor:`${props.botBarColor2}`,width:`${props.botBarPercent2}`}}></div>
                                </div>
                            </div>
                        </div>
                        <div className="dashboard_most-transacted_bot-section">
                            <div className="dashboard_most-transacted_bot-frame" style={{backgroundColor:`${props.botBackgroundColor3}`}}>
                                <div className="dashboard_most-transacted_bot-icon" style={{backgroundImage:`url(${props.botBackgroundColor3})`}}></div>
                            </div>

                            <div className="dashboard_most-transacted-text_container">
                                <p className="dashboard_text-light-xs" style={{margin:"0"}}>{props.numTransactions3} Transactions</p>
                                <p className="dashboard_text-normal-small" style={{margin:"5px 0px 0px 0px"}}>{props.botName3}</p>
                                <div className="dashboard_most-transacted-bar_container">
                                    <div className="dashboard_most-transacted-bar" style={{backgroundColor:`${props.botBarColor3}`,width:`${props.botBarPercent3}`}}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard_payment-panel">
                        <div className="dashboard_payment-panel-card_icon"></div>
                        <div className="dashboard_payment-panel-text_container">
                            <p className="dashboard_text-light" style={{margin:"0px 0px 10px 0px"}}>{props.paymentType}  ???????????? {props.paymentLast4}</p>
                            <a className="dashboard_link_text-normal" href={props.manageSubscriptionUrl}>Manage Subscription ???</a>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default DashboardUser;