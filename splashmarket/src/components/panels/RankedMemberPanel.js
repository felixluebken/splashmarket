import './panels.css'

function RankedMemberPanel(props) {
    return(
        <div className="ranked_member_panel">
            <div className="ranked_member_panel-avatar">
                <div className="ranked_member_panel-avatar-img" style={{backgroundImage:`url(${props.avatar})`}}></div>
            </div>
            <div className="ranked_member_panel-content">
                <p className="panel_text-normal">{props.username}</p>
                <p className="panel_text-light-small" style={{marginTop:"10px"}}>{props.transactions} Transactions | Member since {props.memberSince}</p>
            </div>
            <div className="ranked_member_panel-rank">
                <div className={`ranked_member_panel-rank-img rank_member_panel-${props.ranking}`}></div>
            </div>
        </div>
    )
}

export default RankedMemberPanel;