import React from 'react';
import './panels.css';

/*

name                    -str
lastTransactionPrice    -str
lastTransactionType     -str

lowestAsk               -str
highestOffer            -str

iconUrl                 -str url of the icon
panelBackground         -str hex of the background color

*/

function BotPanel(props) {
  const {
    panelBackground, iconUrl, name, lastTransactionPrice, lastTransactionType, lowestAsk, highestOffer,
  } = props;
  return (
    <div className="bot_panel">
      <div className="bot_panel-icon_frame" style={{ backgroundColor: `${panelBackground}` }}>
        <div className="bot_panel-icon" style={{ backgroundImage: `url(${iconUrl})` }} />
      </div>
      <p className="panel_text-normal" style={{ margin: '20px 0 10px 0' }}>{name}</p>

      <div className="bot_panel-transaction_container">
        <p className="panel_text-light-small" style={{ float: 'left' }}>Last transaction </p>
        <p className="panel_text-normal-small" style={{ float: 'left', marginLeft: '5px' }}>
          {lastTransactionPrice}
          {' '}
          (
          {lastTransactionType}
          )
        </p>
      </div>

      <div className="bot_panel-btn_container">
        <div className="bot_panel-lowest_btn">
          <span className="bot_panel-btn-title">Lowest Ask</span>
          <h6 className="panel_text-normal">{lowestAsk}</h6>
        </div>
        <div className="bot_panel-highest_btn">
          <span className="bot_panel-btn-title">Highest Offer</span>
          <h6 className="panel_text-normal">{highestOffer}</h6>
        </div>
      </div>

    </div>

  );
}

export default BotPanel;
