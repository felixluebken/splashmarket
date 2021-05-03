import './Popups.css'


import GuideTagLarge from '../components/small-panels/guideTagsLarge'


function GuidesBotAdminEditPopup(props) {
    return(
        <div className="popup_panel-big">
            <div className="popup_bot_guides-input-panel">
                <div className="popup_bot_guides-input-container_half">
                    <p className="popup_text-large-light">Type</p>
                    <input className="popup_admin_input" placeholder="Enter type"></input>
                </div>
                <div className="popup_bot_guides-input-container_half">
                    <p className="popup_text-large-light">Grace Period (optional)</p>
                    <input className="popup_admin_input" placeholder="Enter period"></input>
                </div>
            </div>


            <div className="popup_bot_guides-input-panel">
                <div className="popup_bot_guides-input-container_third">
                    <p className="popup_text-large-light">Renewal</p>
                    <select className="popup_admin_select">
                        <option>Lifetime</option>
                        <option>Renewal</option>
                        <option>Lifetime & Renewal</option>
                    </select>
                </div>
                <div className="popup_bot_guides-input-container_third">
                    <p className="popup_text-large-light">Renewal Price (optional)</p>
                    <input className="popup_admin_input" placeholder="Enter price"></input>
                </div>
                <div className="popup_bot_guides-input-container_third">
                    <p className="popup_text-large-light">Renewal Interval (optional)</p>
                    <select className="popup_admin_select">
                        <option>No Interval</option>
                        <option>1 Week</option>
                        <option>1 Month</option>
                        <option>3 Months</option>
                        <option>6 Months</option>
                        <option>12 Months</option>
                    </select>
                </div>
            </div>

            <div className="popup_bot_guides-input-container_full">
                <p className="popup_text-large-light">Sites Supported</p>
                <div className="popup_bot_guides-tag_container">
                    <GuideTagLarge tag="Shopify"></GuideTagLarge>
                    <GuideTagLarge tag="Shopify"></GuideTagLarge>
                    <GuideTagLarge tag="Shopify"></GuideTagLarge>
                    <GuideTagLarge tag="Shopify"></GuideTagLarge>
                    <GuideTagLarge tag="Shopify"></GuideTagLarge>
                    <GuideTagLarge tag="Shopify"></GuideTagLarge>
                    <GuideTagLarge tag="Shopify"></GuideTagLarge>
                    <GuideTagLarge tag="Shopify"></GuideTagLarge>
                    <GuideTagLarge tag="Shopify"></GuideTagLarge>
                    <GuideTagLarge tag="Shopify"></GuideTagLarge>
                </div>
                <input className="popup_admin_input" placeholder="Add more"></input>
            </div>

            <div className="popup_bot_guides-input-container_full">
                <p className="popup_text-large-light">Systems Supported</p>
                <select className="popup_admin_select">
                    <option>Windows</option>
                    <option>Mac OS</option>
                    <option>Windows & Mac OS</option>
                </select>
            </div>


            <div className="popup_bot_guides-input-panel">
                <div className="popup_bot_guides-input-container_half">
                    <p className="popup_text-large-light">Middleman</p>
                    <textarea className="popup_admin_text-area" placeholder="Enter text here"></textarea>
                </div>
                <div className="popup_bot_guides-input-container_half">
                    <p className="popup_text-large-light">Scammer Prevention</p>
                    <textarea className="popup_admin_text-area" placeholder="Enter text here"></textarea>
                </div>
            </div>


            <div className="popup_bot_guides-input-panel">
                <div className="popup_bot_guides-input-container_half">
                    <p className="popup_text-large-light">Twitter</p>
                    <input className="popup_admin_input" placeholder="Enter link here"></input>
                </div>
                <div className="popup_bot_guides-input-container_half">
                    <p className="popup_text-large-light">Instagram (optional)</p>
                    <input className="popup_admin_input" placeholder="Enter link here"></input>
                </div>
            </div>

            <div className="popup_bot_guides_edit-button_container">
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


export default GuidesBotAdminEditPopup;