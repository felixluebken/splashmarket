import './small-panels.css'

/*

tag         -str

*/

function GuideTag(props) {
    return(
        <div className="guide_tag-frame">
            <p className="text-normal-small" style={{margin:"0 10px"}}>{props.tag}</p>
        </div>
    )
}

export default GuideTag;