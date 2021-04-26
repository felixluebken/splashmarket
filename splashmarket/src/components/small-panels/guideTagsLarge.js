import './small-panels.css'

/*

tag         -str

*/

function GuideTagLarge(props) {
    return(
        <div className="guide_tag-frame-large">
            <p className="text-normal-large" style={{margin:"0 10px"}}>{props.tag}</p>
        </div>
    )
}

export default GuideTagLarge;