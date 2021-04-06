import './homepage.css'

import RankedMemberPanel from '../panels/RankedMemberPanel'


function HomepageLeaderboard() {




    return(
        <div className="section_leaderboard">
            <div className="leaderboard_text">
                <span className="section_title-blue">Member Leaderboard</span>
                <span className="section_title-big">View the members with the most transactions</span>
                <span className="section_text">Never worry about the reputation of your buyer or seller again. Splash Market makes it easy for you to verify any user.</span>
            </div>
            <div className="leaderboard_img">
                <RankedMemberPanel  username="dearchitect#7736"
                                    transactions="420"
                                    memberSince="Dec 24, 2020"
                                    ranking="1"
                                    avatar="https://cdn.discordapp.com/avatars/638784999293976635/06d1e75f49559a1b16e6d127ec1c4fbf.jpg"/>
            </div>
        </div>
    )
}

export default HomepageLeaderboard;

