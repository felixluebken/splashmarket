import './panels.css'


function BlogBotPanel(props) {
    return(
        <div className="blog_bot_panel">
            <div className="blog_bot_panel-header" style={{backgroundColor:`${props.headerColor}`}}>
                <div className="blog_bot_panel-header-icon" style={{backgroundImage:`${props.headerIcon}`}}></div>
                <h2 className="blog_bot_panel-header-title" style={{color:`${props.headerTextColor}`}}>{props.headerTitle}</h2>
            </div>
            <div className="blog_bot_panel-body">
                <p className="panel_text-normal" style={{height:"50px", overflowY:"hidden"}}>{props.bodyContent}</p>
                <div className="blog_bot_panel-divider"></div>
                <p className="panel_text-light-small" style={{width:"220px", overflow:"hidden"}}>Published {props.publishDate}</p>
                <div className="blog_bot_panel-author">
                    <div className="blog_bot_panel-author-avatar" style={{backgroundImage:`url(${props.authorAvatar})`}}></div>
                    <p className="panel_text-normal-small " style={{float:"left", margin:"20px 0px 0px 10px"}}>{props.authorUsername}</p>
                    <a href={props.blogUrl}>
                        <div className="blue_button-read_blog">
                            <span class="blue_button-read_blog-text">Read Blog</span>
                        </div>
                    </a>

                </div>

            </div>
        </div>
    )
}

export default BlogBotPanel;