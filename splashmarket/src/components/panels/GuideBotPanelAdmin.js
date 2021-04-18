import './panels.css'

import GuideTag from '../small-panels/guideTags'
import GuideTagAdd from '../small-panels/guideTagsAdd'

/*
iconBackgroundColor             -str
iconUrl                         -str
botName                         -str
*/

function GuideBotPanelAdmin(props) {
    return(

            <div className="guides_panel">
                <div className="guides_panel_admin-header">
                    <div className="guides_panel-icon_frame" style={{margin:0,backgroundColor:`${props.iconBackgroundColor}`}}>
                        <div className="guides_panel-icon" style={{backgroundImage:`url(${props.iconUrl})`}}></div>
                    </div>

                    <div className="guides_panel_admin-delete_btn"></div>
                </div>

                <p className="panel_text-normal" style={{marginLeft:"25px"}}>{props.botName}</p>
                <div className="guides_panel-tags_container">
                    <GuideTag tag="Supreme"/>
                    <GuideTag tag="Adidas"/>
                    <GuideTag tag="YS"/>
                    <GuideTag tag="Walmart"/>
                    <GuideTag tag="Best Buy"/>
                    <GuideTagAdd />
                </div>
            </div>
    )
}
export default GuideBotPanelAdmin;