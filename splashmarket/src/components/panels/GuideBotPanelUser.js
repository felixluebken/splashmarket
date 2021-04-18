import './panels.css'

import GuideTag from '../small-panels/guideTags'

/*
iconBackgroundColor             -str
iconUrl                         -str
botName                         -str

guideUrl                        -str

*/

function GuideBotPanelUser(props) {
    return(

            <div className="guides_panel">
                <a href={props.guideUrl}>
                    <div className="guides_panel-icon_frame" style={{backgroundColor:`${props.iconBackgroundColor}`}}>
                        <div className="guides_panel-icon" style={{backgroundImage:`url(${props.iconUrl})`}}></div>
                    </div>
                    <p className="panel_text-normal" style={{marginLeft:"25px"}}>{props.botName}</p>
                    <div className="guides_panel-tags_container">
                        <GuideTag tag="Supreme"/>
                        <GuideTag tag="Adidas"/>
                        <GuideTag tag="YS"/>
                        <GuideTag tag="Walmart"/>
                        <GuideTag tag="Best Buy"/>
                    </div>
                </a>
            </div>
    )
}
export default GuideBotPanelUser;