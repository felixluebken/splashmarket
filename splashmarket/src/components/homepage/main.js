import './homepage.css'


function HomepageSearch() {
    return(
            <div className="main_section">
                <div className="main_section-frame">
                    <h1 style={{textAlign:"center",marginBottom:"60px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h1>
                </div>
                <div className="search-frame_homepage">
                    <div className="search_icon"></div>
                    <input placeholder="Search Members..." style={{margin:"24px 0px"}}></input>
                    <div className="search_divider" style={{margin:"15px 10px"}}></div>
                    <div className="guides_filter" style={{margin:"20px 10px"}}></div>
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
    )
}


export default HomepageSearch;