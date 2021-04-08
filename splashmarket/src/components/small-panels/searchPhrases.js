import './small-panels.css'



/*
searchTerm              -str
*/

function SearchPhrasePanel(props) {
    return(
        <div className="search_phrase-panel">
            <p className="text-normal-small" style={{margin:"4px 10px",maxWidth:"200"}}>{props.searchTerm}</p>
            <div className="close_icon"></div>
        </div>
    )
}


export default SearchPhrasePanel;