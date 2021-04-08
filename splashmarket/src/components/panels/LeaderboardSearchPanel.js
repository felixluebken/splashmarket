import './panels.css'

import AvatarPanel43 from '../small-panels/avatar43'


/*

username                -str
memberSince             -str
avatarUrl               -str url of the discord user
transactions            -str 
lastTransaction         -str

LATEST TRANSACTION #1
latestTransactionUsername       -str
latestTransactionAvatarUrl      -str latest transaction avatar url


*/


function LeaderboardSearchPanel(props) {
    return(
        <div className="member_leaderboard_panel">
            <div className="member_leaderboard_panel-left">
                <div className="member_leaderboard_panel-header">
                    <div className="member_leaderboard_panel-header-avatar" style={{backgroundImage:`url(${props.avatarUrl})`}}></div>
                    <div>
                        <p className="panel_text-normal" style={{marginTop:"3px"}}>{props.username}</p>
                        <p className="panel_text-light-small" style={{marginTop:"6px"}}>Member since {props.memberSince}</p>
                    </div>


                </div>
                <p className="panel_text-normal member_leaderboard_panel-latest_transactions-title" style={{marginTop:"20px",marginBottom:"10px",marginLeft:"5%",marginRight:"5%"}}>Latest Transactions</p>
                <div className="member_leaderboard_panel-latest_transactions">
                    <div className="member_leaderboard_panel-latest_transactions-main">
                        <div className="member_leaderboard_panel-latest_transactions-main_avatar" style={{backgroundImage:`url(${props.latestTransactionAvatarUrl})`}}></div>
                        <p className="panel_text-normal-small" style={{marginTop:"0px",marginLeft:"10px",maxWidth:"110px",overflow:"hidden"}}>{props.latestTransactionUsername}</p>
                    </div>
                    <div className="member_leaderboard_panel-latest_transactions-additional">
                        {/* DONT PUT MORE THAN 4 */}
                        <AvatarPanel43 avatarUrl="https://cdn.discordapp.com/avatars/638784999293976635/06d1e75f49559a1b16e6d127ec1c4fbf.jpg" />
                        <AvatarPanel43 avatarUrl="https://cdn.discordapp.com/avatars/638784999293976635/06d1e75f49559a1b16e6d127ec1c4fbf.jpg" />
                        <AvatarPanel43 avatarUrl="https://cdn.discordapp.com/avatars/638784999293976635/06d1e75f49559a1b16e6d127ec1c4fbf.jpg" />
                        <AvatarPanel43 avatarUrl="https://cdn.discordapp.com/avatars/638784999293976635/06d1e75f49559a1b16e6d127ec1c4fbf.jpg" />
                    </div>

                </div>
            </div>

            <div className="member_leaderboard_panel-right">
                <div className="member_leaderboard_panel-stats_panel">
                    <div className="member_leaderboard_panel-stats_panel-transaction_icon"></div>
                    <div className="member_leaderboard_panel-stats_panel-text">
                        <p className="panel_text-normal" style={{marginLeft:"10px"}}>{props.transactions}</p>
                        <p className="panel_text-light-small" style={{marginLeft:"10px"}}>Transactions</p>
                    </div>
                </div>
                <div className="member_leaderboard_panel-stats_panel">
                    <div className="member_leaderboard_panel-stats_panel-last_transaction_icon"></div>
                    <div className="member_leaderboard_panel-stats_panel-text">
                        <p className="panel_text-normal" style={{marginLeft:"10px"}}>{props.lastTransaction}</p>
                        <p className="panel_text-light-small" style={{marginLeft:"10px"}}>Last Transaction</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LeaderboardSearchPanel;