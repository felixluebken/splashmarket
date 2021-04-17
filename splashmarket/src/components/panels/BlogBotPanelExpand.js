import './panels.css'

/*

imageUrl            -str 

headerIcon          -str
botName             -str
title               -str



authorAvatar        -str
authorUsername      -str

publishDate         -str



*/

function BotBlogPanelExpand(props) {
    return(
        <div className="bot_blog_panel-expand">

            <div className="bot_blog_panel-expand-img" style={{backgroundImage:`url(${props.imageUrl})`}}>
            </div>

            <div className="bot_blog_panel-expand-content">
                <p className="bot_blog_panel-publish_date">Published {props.publishDate}</p>
                <div className="bot_blog_panel-large-bot_container">
                    <div className="blog_bot_panel-icon" style={{backgroundImage:`${props.headerIcon}`,marginLeft:0}}></div>
                    <p className="blog_bot_panel-title" style={{color:"white"}}>{props.botName}</p>
                </div>
                
                <h4 className="blog_bot_panel-expand-title">{props.title}</h4>
                <div className="blog_bot_panel-divider"></div>

                <div className="blog_bot_panel-author">
                <div className="blog_bot_panel-author-avatar" style={{backgroundImage:`url(${props.authorAvatar})`}}></div>
                    <p className="panel_text-normal-small " style={{float:"left", margin:"20px 0px 0px 10px"}}>{props.authorUsername}</p>
                </div>
            </div>

        </div>

    )
}

export default BotBlogPanelExpand;