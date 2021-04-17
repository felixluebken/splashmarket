import './panels.css'


/*
headerColor         -str
headerIcon          -str
headerTextColor     -str

publishDate         -str
headerTitle         -str

bodyTitle           -str
bodyContent         -str

authorAvatar        -str
authorUsername      -str

blogUrl             -str

*/


function BlogBotPanelSmall(props) {
    return(
        <a href={props.blogUrl}>
            <div className="bot_blog_panel-small">
                <div className="blog_bot_panel-header" style={{backgroundColor:`${props.headerColor}`}}>
                    <div className="blog_bot_panel-header-icon" style={{backgroundImage:`${props.headerIcon}`}}></div>
                    <h2 className="blog_bot_panel-header-title" style={{color:`${props.headerTextColor}`}}>{props.headerTitle}</h2>
                </div>
                <div className="blog_bot_panel-body">
                    <p className="panel_text-light-small" style={{width:"220px", overflow:"hidden",marginBottom:"5px"}}>Published {props.publishDate}</p>
                    <h6 className="blog_bot_panel-title">{props.bodyTitle}</h6>
                    <p className="blog_bot_panel-content" style={{width:"100%", overflow:"hidden",marginTop:"5px"}}>{props.bodyContent}</p>
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

export default BlogBotPanelSmall;