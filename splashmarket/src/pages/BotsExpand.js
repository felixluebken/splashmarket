/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useState, useEffect } from 'react';
import './Bots.css';
import { useParams, useHistory } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import Loader from 'react-loader-spinner';
import DownsamplePlugin from 'chartjs-plugin-downsample';
import useQuery from '../helpers/useQuery';
import HeaderBots from '../components/header/headerBots';
import Footer from '../components/footer/footer';
import PreviousSales from '../components/list-panels/previousSales';
import BotService from '../services/BotService';

function BotsExpand(props) {
  const {
    botName, bannerTextColor,
  } = props;

  const timeframes = {
    day: '1d',
    week: '1wk',
    month: '1mo',
    year: '1yr',
  };
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const { bot } = useParams();
  const [foundBot, setFoundBot] = useState([]);
  const [timeUnit, setTimeUnit] = useState('week');
  const timeframeQuery = useQuery().get('timeframe') || timeframes.week;

  const [activeTimeframe, setActiveTimeframe] = useState(timeframeQuery);
  const borderColors = ['#27AAF7', '#db4052', '#ff9933', '#fff'];
  useEffect(() => {
    history.push({ location: history.location.pathname, search: `timeframe=${activeTimeframe}` });

    const onGetBotSuccess = (response) => {
      setFoundBot(response.data);
      setIsLoading(false);
    };

    const onGetBotError = (error) => {
      console.log('ERROR: ', error.response);
      if (error.response) {
        if (error.response.data === 'There were no transactions found.' && error.response.status === 404) {
          setFoundBot([]);
        }
      }
      setIsLoading(false);
    };
    BotService.GetSales(bot, activeTimeframe, onGetBotSuccess, onGetBotError);
  }, [bot, activeTimeframe]);

  console.log('FOUND BOT: ', foundBot);
  useEffect(() => {
    switch (timeframeQuery) {
      case '1yr':
        setTimeUnit('week');
        break;
      case '1mo':
        setTimeUnit('day');
        break;
      case '1wk':
        setTimeUnit('day');
        break;
      default:
        setTimeUnit('hour');
        break;
    }
  }, [timeframeQuery]);

  if (isLoading) {
    return (
      <div className="loading-icon-container" style={{ height: '100%' }}>
        <Loader
          type="Puff"
          color="#00BFFF"
          height={200}
          width={100}
          timeout={15000}
        />
      </div>
    );
  }

  return (
    <>
      <div className="bots_header-container">
        <HeaderBots />
      </div>
      <div className="bots_expand-header_banner" style={{ backgroundColor: `${foundBot && foundBot.headerColor ? `${foundBot.headerColor}E6` : 'transparent'}` }}>
        <div className="bots_expand-header_container">
          <div className="bots_expand-header_icon" style={{ backgroundImage: `url(${foundBot.logo || null})` }} />
          <h4 className="bots_title" style={{ color: `${bannerTextColor}` }}>{foundBot.botName || 'N/A'}</h4>
        </div>
        <div className="bots_expand-header_last-sale_container">
          <p className="last_sale_text">Last Sale</p>
          <h5 className="last_sale_text">{`${foundBot.lastTransaction ? `$${foundBot.lastTransaction}` : 'N/A'}`}</h5>
        </div>
      </div>

      <div className="bots_expand-graph_panel">
        <div className="bots_expand-graph_panel-header">
          <p
            className={`graph_nav_text ${activeTimeframe === timeframes.year ? 'bots_expand-header-active' : ''}`}
            role="button"
            id={timeframes.year}
            tabIndex={0}
            aria-label="Home page header"
            aria-hidden="true"
            onClick={(event) => {
              setActiveTimeframe(event.target.id);
            }}
          >
            Year

          </p>
          <p
            className={`graph_nav_text ${activeTimeframe === timeframes.month ? 'bots_expand-header-active' : ''}`}
            role="button"
            id={timeframes.month}
            tabIndex={0}
            aria-label="Home page header"
            aria-hidden="true"
            onClick={(event) => {
              setActiveTimeframe(event.target.id);
            }}
          >
            Month

          </p>
          <p
            className={`graph_nav_text ${activeTimeframe === timeframes.week ? 'bots_expand-header-active' : ''}`}
            role="button"
            id={timeframes.week}
            tabIndex={0}
            aria-label="Home page header"
            aria-hidden="true"
            onClick={(event) => {
              setActiveTimeframe(event.target.id);
            }}
          >
            Week

          </p>
          <p
            className={`graph_nav_text ${activeTimeframe === timeframes.day ? 'bots_expand-header-active' : ''}`}
            role="button"
            id={timeframes.day}
            tabIndex={0}
            aria-label="Home page header"
            aria-hidden="true"
            onClick={(event) => {
              setActiveTimeframe(event.target.id);
            }}
          >
            Day

          </p>
        </div>

        <div className="bots_expand-graph_panel-divider" />

        <div className="bots_expand-graph_panel-legend">
          <div className="bots_expand-graph_panel-legend-title">
            <h6 className="graph_light_title">Splash Market</h6>
            <h4 className="graph_normal_title">{botName}</h4>
          </div>

          <div className="bots_expand-graph_panel-legend-legend">
            {foundBot.renewalTypes && Object.keys(foundBot.datasets).length > 0 && Object.keys(foundBot.datasets).map((renewalType, index) => {
              const capitalizedRenewal = renewalType.split(' ');
              if (foundBot.datasets[renewalType].data.length === 0) return null;
              for (let i = 0; i < capitalizedRenewal.length; i += 1) {
                capitalizedRenewal[i] = capitalizedRenewal[i][0].toUpperCase() + capitalizedRenewal[i].substr(1);
              }
              return (
                <div className="bots_expand-graph_panel-legend-container">
                  <div className="bots_expand-graph_panel-legend_rectangle" style={{ backgroundColor: borderColors[index] }} />
                  <p className="graph_light_text">{capitalizedRenewal}</p>
                </div>
              );
            })}
          </div>

        </div>

        <div className="bots_expand-graph_panel-graph">
          <Line
            data={{
              datasets: (foundBot && foundBot.datasets && Object.keys(foundBot.datasets) && Object.keys(foundBot.datasets).map((renewalType, index) => {
                const capitalizedRenewal = renewalType.split(' ');

                // const dataPrices = foundBot.datasets[renewalType].data || [];
                const data = foundBot.datasets[renewalType].dataset || [{
                  x: 0,
                  y: 0,
                }];

                for (let i = 0; i < capitalizedRenewal.length; i += 1) {
                  capitalizedRenewal[i] = capitalizedRenewal[i][0].toUpperCase() + capitalizedRenewal[i].substr(1);
                }
                const dataset = {
                  label: capitalizedRenewal,
                  data,
                  backgroundColor: ['transparent'],
                  borderColor: borderColors[index],
                  spanGaps: true,
                };
                return dataset;
              })) || null,
            }}
            options={{
              animation: false,
              elements: {
                line: {
                  tension: 0.2,
                },
              },
              plugins: {
                DownsamplePlugin,

              },
              downsample: {
                auto: true,
                enabled: true,
                threshold: foundBot.dates.length || 0, // max number of points to display per dataset
              },
              legend: { display: false },
              responsive: true,
              parsing: false,
              scales: {
                xAxes: [{
                  display: true,
                  type: 'time',
                  time: {
                    unit: timeUnit,
                  },

                  gridLines: {
                    color: '#303046',
                  },
                  ticks: {
                    fontSize: 16,
                    fontColor: '#BFC3D3',
                    autoSkip: true,
                    maxTicksLimit: 10,
                  },
                }],
                yAxes: [{
                  display: true,
                  gridLines: {
                    color: '#303046',
                  },
                  distribution: 'linear',
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
                    callback(value, index, values) {
                      return `$${value}`;
                    },
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
              <PreviousSales key={transaction._id} date={convertedDate || 'N/A'} type={transaction.renewalType} price={`${transaction.paymentPrice ? `$${transaction.paymentPrice}` : 'N/A'}`} />
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default BotsExpand;
