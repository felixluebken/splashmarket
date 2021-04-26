import React, { useState, useEffect } from 'react';
import './Bots.css';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import useQuery from '../helpers/useQuery';
import HeaderBots from '../components/header/headerBots';
import Footer from '../components/footer/footer';
import PreviousSales from '../components/list-panels/previousSales';
import BotService from '../services/BotService';

/*

bannerColor                 -str hex code of the background color
bannerTextColor             -str hex code of the text color
bannerIconUrl               -str
bannerBackgroundUrl         -str        (uncomment when assets are ready from database)

botName                     -str
lastSale                    -str

*/

function BotsExpand(props) {
  const {
    bannerColor, bannerIconUrl, botName, lastSale, bannerTextColor,
  } = props;
  const [isLoading, setIsLoading] = useState(true);
  const { bot } = useParams();
  const [foundBot, setFoundBot] = useState([]);
  const [dates, setDates] = useState([]);
  const [prices, setPrices] = useState([]);
  const timeframeQuery = useQuery().get('timeframe');
  useEffect(() => {
    const onGetBotSuccess = (response) => {
      setFoundBot(response.data);
      setIsLoading(false);
    };

    const onGetBotError = (error) => {
      console.log('ERROR: ', error.response);
    };
    BotService.GetSales(bot, timeframeQuery, onGetBotSuccess, onGetBotError);
  }, [bot]);

  useEffect(() => {
    if (foundBot.transactions && foundBot.transactions.length > 0) {
      foundBot.transactions.forEach((botTransaction) => {
        const convertedDate = moment(botTransaction.createdAt).format('YYYY-MM-DD');

        // // console.log('BOT TRANSACTION: ', botTransaction);
        // if (mergedBotRenewals.includes(botTransaction.bot.trim().toLowerCase())) {
        //   if (!standardRenewalTypes.includes(botTransaction.renewalType.trim().toLowerCase())) {
        //     botTransaction.renewalType = ' Renewal';
        //   }
        // }
        // foundRenewalTypes[botTransaction.renewalType].dataValues.push({
        //   x: new Date(convertedDate),
        //   y: botTransaction.paymentPrice,
        // });
        setDates([...dates, convertedDate]);
        setPrices([...prices, botTransaction.paymentPrice]);
        dates.push(convertedDate);
        prices.push(botTransaction.paymentPrice);
      });
    }
  }, [foundBot.transactions]);

  if (isLoading) {
    return (
      <h1>
        LOADING...
      </h1>
    );
  }

  console.log('FOUND BOT: ', dates);
  console.log('PRICE: ', prices);
  return (
    <>
      <div className="bots_header-container">
        <HeaderBots />
      </div>
      <div className="bots_expand-header_banner" style={{ backgroundColor: 'transparent' /* ,backgroundImage:`url(${bannerBackgroundUrl})` */ }}>
        <div className="bots_expand-header_container">
          <div className="bots_expand-header_icon" style={{ backgroundImage: `url(${foundBot.logo || null})` }} />
          <h4 className="bots_title" style={{ color: `${bannerTextColor}` }}>{foundBot.botName || 'N/A'}</h4>
        </div>
        <div className="bots_expand-header_last-sale_container">
          <p className="last_sale_text">Last Sale</p>
          <h5 className="last_sale_text">{`$${foundBot.lastTransaction || 'N/A'}`}</h5>
        </div>
      </div>

      <div className="bots_expand-graph_panel">
        <div className="bots_expand-graph_panel-header">
          <p className="graph_nav_text">Year</p>
          <p className="graph_nav_text">Month</p>
          <p className="graph_nav_text">Week</p>
          <p className="graph_nav_text">Day</p>
        </div>

        <div className="bots_expand-graph_panel-divider" />

        <div className="bots_expand-graph_panel-legend">
          <div className="bots_expand-graph_panel-legend-title">
            <h6 className="graph_light_title">Splash Market</h6>
            <h4 className="graph_normal_title">{botName}</h4>
          </div>

          <div className="bots_expand-graph_panel-legend-legend">
            {foundBot.renewalTypes && foundBot.renewalTypes.length > 0 && foundBot.renewalTypes.map((renewalType) => {
              const capitalizedRenewal = renewalType.split(' ');

              for (let i = 0; i < capitalizedRenewal.length; i += 1) {
                capitalizedRenewal[i] = capitalizedRenewal[i][0].toUpperCase() + capitalizedRenewal[i].substr(1);
              }
              return (
                <div className="bots_expand-graph_panel-legend-container">
                  <div className="bots_expand-graph_panel-legend_rectangle" style={{ backgroundColor: '#27AAF7' }} />
                  <p className="graph_light_text">{capitalizedRenewal}</p>
                </div>
              );
            })}
          </div>

        </div>

        <div className="bots_expand-graph_panel-graph">
          <Line
            data={{
              labels: dates || [],
              datasets: [
                {
                  label: 'Renewal',
                  data: prices,
                  backgroundColor: ['transparent'],
                  borderColor: ['#27AAF7'],
                },
                // {
                //   label: 'Lifetime',
                //   data: [6700, 5900, 6100, 6200, 6100, 7400],
                //   backgroundColor: ['transparent'],
                //   borderColor: ['#FB4056'],
                // },
              ],
            }}
            options={{
              legend: { display: false },
              responsive: true,
              scales: {
                y: {
                  max: 10000,
                },
                x: {
                  max: 10000,
                },
                xAxes: [{
                  display: true,
                  gridLines: {
                    color: '#303046',
                  },
                  ticks: {
                    fontSize: 16,
                    fontColor: '#BFC3D3',
                    autoSkip: true,
                    maxTicksLimit: 15,
                  },
                }],
                yAxes: [{
                  display: true,
                  gridLines: {
                    color: '#303046',
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Price (USD)',
                    fontSize: 18,
                    fontColor: '#BFC3D3',
                  },
                  ticks: {
                    fontSize: 16,
                    fontColor: '#BFC3D3',
                    autoSkip: true,
                    maxTicksLimit: 15,
                  },
                }],

              },
            }}
          />
        </div>
      </div>
      <div className="bots_expand-previous_sales_panel">
        <p className="previous_sales_text">Previous sales</p>
        <table>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Price</th>
          </tr>
        </table>
        <div className="bots_expand-previous_sales_container">
          {foundBot.transactions && foundBot.transactions.length > 0 && foundBot.transactions.slice(0).reverse().map((transaction) => {
            const convertedDate = moment(transaction.createdAt).format('MMMM DD, YYYY');
            return (
              <PreviousSales date={convertedDate || 'N/A'} type={transaction.renewalType} price={`${transaction.paymentPrice ? `$${transaction.paymentPrice}` : 'N/A'}`} />
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default BotsExpand;
