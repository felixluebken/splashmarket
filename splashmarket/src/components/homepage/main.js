import React from 'react';
import './homepage.css';

function HomepageSearch() {
<<<<<<< HEAD
    return(
            <div className="main_section">
                <div className="main_section-frame">
                    <h1 style={{textAlign:"center",marginBottom:"60px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h1>
                </div>
                <div className="search-frame_homepage">
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
=======
  return (
    <div className="main_section">
      <div className="main_section-frame">
        <h1 style={{ textAlign: 'center', marginBottom: '60px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h1>
      </div>
      <div className="search-frame">
        <div className="search_icon" />
        <input placeholder="Search Members..." style={{ margin: '24px 0px' }} />
        <div className="search_divider" style={{ margin: '15px 10px' }} />
        <div className="filter_icon" style={{ margin: '20px 10px' }} />
        <select style={{ margin: '21px 0px' }}>
          <option>Filter...</option>
          <option>1</option>
          <option>2</option>
        </select>
        <div className="blue_button-search" style={{ margin: '15px' }}>
          <span className="blue_button-search-text">Search</span>
        </div>
      </div>
>>>>>>> 1477cb1... Added eslint and router

    </div>
  );
}

export default HomepageSearch;
