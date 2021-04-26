import React from 'react';
import './panels.css';
import { useHistory } from 'react-router-dom';
/*

name                    -str
lastTransactionPrice    -str
lastTransactionType     -str

lastTransaction               -str
highestSale            -str

iconUrl                 -str url of the icon
panelBackground         -str hex of the background color

*/

const BotPanel = (props) => {
  const {
    iconUrl, name, lastTransactionPrice, lastTransactionType, highestSale, lastTransactionDate,
  } = props;

  const history = useHistory();
  const handleBotRedirect = () => {
    history.push(`/bots/${name}`);
  };

  return (
    // This should be clickable and redirect to the bot's graph
    <div
      className="bot_panel"
      style={{ cursor: 'pointer' }}
      role="button"
      tabIndex={0}
      aria-label="Home page header"
      aria-hidden="true"
      onClick={handleBotRedirect}
    >
      <div className="bot_panel-icon_frame" style={{ backgroundColor: 'black' }}>
        <div className="bot_panel-icon" style={{ backgroundImage: `url(${iconUrl})` }} />
      </div>
      <p className="panel_text-normal" style={{ margin: '20px 0 10px 0' }}>{name}</p>

      <div className="bot_panel-transaction_container">
        <p className="panel_text-light-small" style={{ float: 'left' }}>Last transaction </p>
        <p className="panel_text-normal-small" style={{ float: 'left', marginLeft: '5px' }}>
          {`${lastTransactionDate || 'N/A'} ${lastTransactionType || 'N/A'}`}

        </p>
      </div>

      <div className="bot_panel-transaction_container" />

      <div className="bot_panel-btn_container">
        <div className="bot_panel-lowest_btn">
          <span className="bot_panel-btn-title">Last Transaction</span>
          <h6 className="panel_text-normal">{`$${lastTransactionPrice || 'N/A'}`}</h6>
        </div>
        <div className="bot_panel-highest_btn">
          <span className="bot_panel-btn-title">Highest Sale</span>
          <h6 className="panel_text-normal">{`$${highestSale || 'N/A'}`}</h6>
        </div>
      </div>

    </div>

  );
};

export default BotPanel;
