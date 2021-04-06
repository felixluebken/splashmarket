import './list-panels.css'


/*
PROP PARAMS

botBackground   - str (hex code of color)
botIcon         - str (url of icon)
botName         - str
date            - str
position        - str
otherParty      - str
transcriptUrl   - str (url of the transcript)
transcriptTitle - str
*/

function TransactionHistoryPanel(props) {
    return(
        <div className="transaction_history-panel">
            <div className="transaction_history-container">
                <div className="transaction_history-bot_frame" style={{backgroundColor:`${props.botBackground}`}}>
                    <div className="transaction_history-bot_icon" style={{backgroundImage:`${props.botIcon}`}}></div>
                </div>
                <p className="list_panel_text-normal" style={{maxWidth:"58%"}}>{props.botName}</p>
            </div>
            <div className="transaction_history-container">
                <p className="list_panel_text-normal" style={{maxWidth:"90%"}}>{props.date}</p>
            </div>

            <div className="transaction_history-container">
                <p className="list_panel_text-normal" style={{maxWidth:"90%"}}>{props.position}</p>
            </div>

            <div className="transaction_history-container">
                <p className="list_panel_text-normal" style={{maxWidth:"90%"}}>{props.otherParty}</p>
            </div>

            <div className="transaction_history-container">
                <a className="list_panel_link-normal" href={props.transcriptUrl}>{props.transcriptTitle} ⇾</a>
            </div>
        </div>
    )
}

export default TransactionHistoryPanel;