import React from 'react';
import './panels.css';

/*

name                    -str
lastTransactionPrice    -str
lastTransactionType     -str

lastTransaction               -str
highestSale            -str

iconUrl                 -str url of the icon
panelBackground         -str hex of the background color

*/

function BotPanel(props) {
  const {
    iconUrl, name, lastTransactionPrice, lastTransactionType, lastTransaction, highestSale,
  } = props;

  return (
    // This should be clickable and redirect to the bot's graph
    <div className="bot_panel" style={{ cursor: 'pointer' }}>
      <div className="bot_panel-icon_frame" style={{ backgroundColor: 'black' }}>
        <div className="bot_panel-icon" style={{ backgroundImage: `url(${iconUrl})` }} />
      </div>
      <p className="panel_text-normal" style={{ margin: '20px 0 10px 0' }}>{name}</p>

      <div className="bot_panel-transaction_container" />

      <div className="bot_panel-btn_container">
        <div className="bot_panel-lowest_btn">
          <span className="bot_panel-btn-title">Last Transaction</span>
          <h6 className="panel_text-normal">{lastTransaction}</h6>
        </div>
        <div className="bot_panel-highest_btn">
          <span className="bot_panel-btn-title">Highest Sale</span>
          <h6 className="panel_text-normal">{highestSale}</h6>
        </div>
      </div>

    </div>

  );
}

export default BotPanel;
