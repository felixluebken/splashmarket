import React from 'react';
import './list-panels.css';

/*

date            -str
type            -str
price           -str

*/

function PreviousSales(props) {
  const { date, type, price } = props;
  return (
    <div className="previous_sales-panel">

      <div className="previous_sales-container">
        <p className="list_panel_text-normal">{date}</p>
      </div>

      <div className="previous_sales-container">
        <div className="previous_sales-text_padding">
          <p className="list_panel_text-normal" style={{ margin: '10px 15px' }}>{type}</p>
        </div>
      </div>

      <div className="previous_sales-container">
        <p className="list_panel_text-normal">{price}</p>
      </div>

    </div>
  );
}

export default PreviousSales;
