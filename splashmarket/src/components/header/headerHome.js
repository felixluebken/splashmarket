
import './header.css';


function HeaderHomepage() {
    return(
        <div className="header">
            <div className="logo"></div>
            <div className="nav">
                <a className="currentPage">Home</a>
                <a>Leaderboard</a>
                <a>Bots</a>
                <a>Blogs</a>
                <a>Guide</a>
            </div>
            <div className="button_group">
                <div className="blue_button" style={{width:123,height:35}}>
                    <span className="blue_button-text">Dashboard</span>
                </div>
                <div className="dark_button" style={{width:123,height:35}}>
                    <span className="dark_button-text">Droplets</span>
                </div>
            </div>
        </div>
        
    );
}


export default HeaderHomepage;

