import './Popups.css'
/**
title           -str
details         -str

*/

function RedeemDropletsPopup(props) {
    return(
        <div className="popup_panel-small">
            <div className="droplets_redeem_success-header">
                <div className="party_popper-icon"></div>
                <h4 className="popup_text-normal">Success!</h4>
            </div>
            <h3 className="popup_text-normal" style={{textAlign:"center"}}>{props.title}</h3>
            <p className="popup_text-normal" style={{textAlign:"center",margin:"30px 5%",width:"90%"}}>{props.details}</p>
            <div className="popup_blue-btn" style={{margin:"10px auto"}}>
                <span className="popup_blue-btn_text">Back to shop</span>
            </div>
        </div>

    )
}

export default RedeemDropletsPopup;