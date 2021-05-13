import './Popups.css'



function BlogsEditPopup(props) {
    return(
        <div className="popup_panel-big">
            <div className="blogs_edit-main">
                <div className="blogs_edit-details">
                    <div className="blogs_edit-header">
                        <div className="blogs_edit-header_img-frame">
                            <div className="blogs_edit-header_img"></div>
                        </div>

                        <div style={{marginLeft:"20px",width:"70%"}}>
                            <p className="popup_text-normal" style={{margin:"0px 0px 5px 0px"}}>Bot Name</p>
                            <input type="text" className="popup_admin_input" placeholder="Enter bot"></input>
                        </div>
                    </div>
                    <div style={{width:"100%",display:"inline-block"}}>
                        <p className="popup_text-normal" style={{margin:"0px 0px 5px 0px"}}>Image URL</p>
                        <input type="text" className="popup_admin_input" placeholder="Enter image URL"></input>
                    </div>

                    <div style={{width:"100%",marginTop:"20px",display:"inline-block"}}>
                        <p className="popup_text-normal" style={{margin:"0px 0px 5px 0px"}}>Header Color</p>
                        <input type="text" className="popup_admin_input" placeholder="#03F045"></input>
                    </div>
                </div>
                <div className="blogs_edit-body">

                    <div className="blogs_edit-header">
                        <div style={{width:"100%"}}>
                            <p className="popup_text-normal" style={{margin:"0px 0px 5px 0px"}}>Title</p>
                            <input type="text" className="popup_admin_input" placeholder="Enter title"></input>
                        </div>
                    </div>
                    <p className="popup_text-normal" style={{margin:"0px 0px 5px 0px"}}>Body</p>
                        <textarea className="popup_blog_text-area" placeholder="Type your blog here">

                        </textarea>
                    </div>
            </div>
            <div className="blogs_edit-buttons">
                <div className="popup_red-btn">
                    <span className="popup_red-btn_text">Cancel</span>
                </div>
                <div className="popup_blue-btn">
                    <span className="popup_blue-btn_text">Add Blog</span>
                </div>
            </div>
        </div>
    )
}


export default BlogsEditPopup;