import React from 'react';
import './list-panels.css';
import { useParams } from 'react-router-dom';
import BotSwapIcon from '../../resources/logo/bot-swap-icon.svg';
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
  const { id } = useParams();

  return (
    <div className="transaction_history-panel">
      <div className="transaction_history-container">
        <div className="transaction_history-bot_frame" style={{ backgroundColor: botIcon ? `${botBackground}` : '#242637' }}>
          <div className="transaction_history-bot_icon" style={{ backgroundImage: botIcon ? `url(${botIcon})` : `url(${BotSwapIcon})` }} />
        </div>
        <p className="list_panel_text-normal" style={{ maxWidth: '58%', minWidth: '58%' }}>{botName}</p>
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

      {!id && (
      <div
        className="transaction_history-container"
      >
        <a
          className="list_panel_link-normal"
          href={transcriptUrl}
          target="_blank"
          rel="noreferrer"
          download={transcriptTitle}
        >
          {`${transcriptTitle ? `${transcriptTitle} ⇾` : transcriptTitle}`}
        </a>
      </div>
      )}

    </div>
  );
}

export default TransactionHistoryPanel;
