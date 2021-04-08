import './Leaderboard.css'


import HeaderLeaderboard from '../components/header/headerLeaderboard'
import Footer from '../components/footer/footer'

import SearchPhrasePanel from '../components/small-panels/searchPhrases'
import LeaderboardSearchPanel from '../components/panels/LeaderboardSearchPanel'

/*
numResults              -str number of searchresults




*/


function Leaderboard(props) {
    return(
        <>
            <HeaderLeaderboard />
            <div className="leaderboard_search-section">
                <h3 className="leaderboard_title">Find any member.</h3>

                <div className="search-frame">
                    <div className="search_icon"></div>
                    <input placeholder="Search Members..." style={{margin:"24px 0px"}}></input>
                    <div className="search_divider" style={{margin:"15px 10px"}}></div>
                    <div className="filter_icon" style={{margin:"20px 10px"}}></div>
                    <select style={{margin:"21px 0px"}}>
                        <option>Filter...</option>
                        <option>1</option>
                        <option>2</option>
                    </select>
                    <div className="blue_button-search" style={{margin:"15px"}}>
                        <span className="blue_button-search-text">Search</span>
                    </div>
                </div>
            </div>

            <div className="leaderboard_body-section">
                <div className="leaderboard_body-current_search">
                    <div className="leaderboard_body-current_search-terms-container">
                        <p className="text-normal">Current Search</p>
                        <div className="leaderboard_body-current_search-terms">
                            <SearchPhrasePanel searchTerm="dearchitect"/>
                            <SearchPhrasePanel searchTerm="sapatos"/>
                        </div>
                    </div>

                    <div className="leaderboard_body-current_search-categories-container">
                        <p className="text-normal" style={{marginBottom:"20px"}}>Refine by Categories</p>

                        <div class="checkbox-container">
                            <input type="checkbox" className="checkbox"/>
                            <p className="text-light-small" style={{margin:"3px 0px 0px 0px"}}>Most Transactions</p>
                        </div>

                        <div class="checkbox-container">
                            <input type="checkbox" className="checkbox"/>
                            <p className="text-light-small" style={{margin:"3px 0px 0px 0px"}}>Oldest Join Date</p>
                        </div>

                        <div class="checkbox-container">
                            <input type="checkbox" className="checkbox"/>
                            <p className="text-light-small" style={{margin:"3px 0px 0px 0px"}}>Newest Join Date</p>
                        </div>
                    </div>


                </div>
                
                <div className="leaderboard_body-results">
                    <p className="text-light">Showing {props.numResults} results</p>
                    <div className="leaderboard_body-results-container">
                        <LeaderboardSearchPanel 
                            username="dearchitect#7745" 
                            memberSince="Jan 1, 2012"
                            avatarUrl="https://cdn.discordapp.com/avatars/638784999293976635/06d1e75f49559a1b16e6d127ec1c4fbf.jpg"

                            transactions="100"
                            lastTransaction="Mar 24, 2021"

                            latestTransactionUsername="dearchitect#7745"
                            latestTransactionAvatarUrl="https://cdn.discordapp.com/avatars/638784999293976635/06d1e75f49559a1b16e6d127ec1c4fbf.jpg"
                        />
                        <LeaderboardSearchPanel username="sapatos#7745" memberSince="Jan 1, 2012" />
                    </div>
                </div>
            </div>


            <Footer />
        </>

    )
}

export default Leaderboard;