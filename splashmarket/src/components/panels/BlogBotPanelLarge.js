import './panels.css'

/*

imageUrl            -str 

headerIcon          -str
botName             -str
title               -str



authorAvatar        -str
authorUsername      -str

blogUrl             -str

publishDate         -str
*/

function BotBlogPanelLarge(props) {
    return(
        <a href={props.blogUrl}>
            <div className="bot_blog_panel-large">

                <div className="bot_blog_panel-large-img" style={{backgroundImage:`url(${props.imageUrl})`}}>
                    <div className="bot_blog_panel-large-new_container">
                        <span className="bot_blog_panel-large-new_text">New Post</span>
                    </div>
                </div>

                <div className="bot_blog_panel-large-content">
                    <p className="bot_blog_panel-publish_date">Published {props.publishDate}</p>
                    <div className="bot_blog_panel-large-bot_container">
                        <div className="blog_bot_panel-icon" style={{backgroundImage:`${props.headerIcon}`,marginLeft:0}}></div>
                        <p className="blog_bot_panel-title" style={{color:"white"}}>{props.botName}</p>
                    </div>
                    
                    <h4 className="blog_bot_panel-title">{props.title}</h4>
                    <div className="blog_bot_panel-divider"></div>

                    <div className="blog_bot_panel-author">
                    <div className="blog_bot_panel-author-avatar" style={{backgroundImage:`url(${props.authorAvatar})`}}></div>
                        <p className="panel_text-normal-small " style={{float:"left", margin:"20px 0px 0px 10px"}}>{props.authorUsername}</p>
                    </div>
                </div>

            </div>
        </a>

    )
}

export default BotBlogPanelLarge;