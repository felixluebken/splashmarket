import React from 'react';
import './list-panels.css';

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
  const {
    botBackground, botIcon, botName, date, position, otherParty, transcriptUrl, transcriptTitle,
  } = props;

  return (
    <div className="transaction_history-panel">
      <div className="transaction_history-container">
        <div className="transaction_history-bot_frame" style={{ backgroundColor: `${botBackground}` }}>
          <div className="transaction_history-bot_icon" style={{ backgroundImage: `url(${botIcon})` }} />
        </div>
        <p className="list_panel_text-normal" style={{ maxWidth: '58%' }}>{botName}</p>
      </div>
      <div className="transaction_history-container">
        <p className="list_panel_text-normal" style={{ maxWidth: '90%' }}>{date}</p>
      </div>

      <div className="transaction_history-container">
        <p className="list_panel_text-normal" style={{ maxWidth: '90%' }}>{position}</p>
      </div>

      <div className="transaction_history-container">
        <p className="list_panel_text-normal" style={{ maxWidth: '90%' }}>{otherParty}</p>
      </div>

      <div className="transaction_history-container">
        <a className="list_panel_link-normal" href={transcriptUrl}>
          {transcriptTitle}
          {' '}
          ⇾
        </a>
      </div>
    </div>
  );
}

export default TransactionHistoryPanel;
