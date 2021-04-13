import './Popups.css'



function DropletsAdminAddPopup() {
    return(
        <div className="popup_panel-tall">
            <div className="droplets_admin_add-header_container">
                <div className="droplets_admin_add-header_img-frame">
                    <div className="droplets_admin_add-header_img"></div>
                </div>
                <div className="droplets_admin_add-header_text-frame">
                    <p className="popup_text-normal-small" style={{marginBottom:"6px"}}>Company</p>
                    <input className="popup_admin_input" placeholder="Enter company"></input>
                </div>



            </div>

            <p className="popup_text-normal-small" style={{marginBottom:"6px"}}>Prize Name</p>
            <input type="text" className="popup_admin_input" placeholder="Enter prize" style={{marginBottom:"10px"}}></input>

            <p className="popup_text-normal-small" style={{marginBottom:"6px"}}>Droplet Amount</p>
            <input tyle="number" className="popup_admin_input" placeholder="Enter amount" style={{marginBottom:"10px"}}></input>

            <p className="popup_text-normal-small" style={{marginBottom:"6px"}}>Company Description</p>
            <textarea className="popup_admin_text-area" placeholder="Enter text here" style={{marginBottom:"10px"}}></textarea>

            <p className="popup_text-normal-small" style={{marginBottom:"6px"}}>Prize Description</p>
            <textarea className="popup_admin_text-area" placeholder="Enter text here" style={{marginBottom:"10px"}}></textarea>

            <div className="droplets_admin_add-btn_container">
                <div className="popup_red-btn" style={{width:"45%"}}>
                    <span className="popup_red-btn_text">Cancel</span>
                </div>

                <div className="popup_blue-btn" style={{width:"45%"}}>
                    <span className="popup_blue-btn_text">Save</span>
                </div>
            </div>

        </div>
    )
}

export default DropletsAdminAddPopup;