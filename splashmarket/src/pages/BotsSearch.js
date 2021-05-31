import React, { useState, useEffect } from 'react';
import Autocomplete from 'react-autocomplete';
import Loader from 'react-loader-spinner';
import useQuery from '../helpers/useQuery';
import './Bots.css';
import HeaderBots from '../components/header/headerBots';
import Footer from '../components/footer/footer';
import PageSwitch from '../components/page-switch/PageSwitch';
import BotPanel from '../components/panels/BotPanel';
import BotService from '../services/BotService';
import UseDebounce from '../helpers/useDebounce';
import selectOptions from '../helpers/selectOptions';

const BotsSearch = () => {
  const [bots, setBots] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageQuery = useQuery().get('page');
  const [botsSearch, setBotsSearch] = useState('');
  const [sortSearch, setSortSearch] = useState('');
  const [botSearchResults, setBotSearchResults] = useState([{ displayName: 'There are no results to show' }]);
  const debouncedBot = UseDebounce(botsSearch, 1000);
  const [isLoading, setIsLoading] = useState(true);

  const findBotsWithGraphs = async () => {
    const onFindBotsSuccess = (response) => {
      if (response.data.pager && response.data.pager.currentPage) {
        setCurrentPage(response.data.pager.currentPage);
      }
      setBots(response.data);
      setIsLoading(false);
    };
    const onFindBotsError = (error) => {
      console.log('ERROR: ', error);
      setIsLoading(false);
    };
    BotService.FindBotsWithGraphs(pageQuery || 1, onFindBotsSuccess, onFindBotsError);
  };

  console.log('IS LOADING: ', isLoading);

  useEffect(() => {
    findBotsWithGraphs();
  }, [pageQuery]);

  const handleChange = (event) => {
    setBotsSearch(event.target.value);
  };
  const handleSelectionChange = (event) => {
    setSortSearch(event.target.value);
  };

  const makeAndHandleRequest = async () => {
    // This sets search results for the debounce
    const onBotSearchSuccess = (response) => {
      setBotSearchResults(response.data);
      setIsLoading(false);
    };
    const onBotSearchError = (error) => {
      console.log('ERROR: ', error.response.data);
      setIsLoading(false);
    };
    await BotService.SearchBot(botsSearch, sortSearch, onBotSearchSuccess, onBotSearchError);
  };

  useEffect(() => {
    if (debouncedBot) {
      makeAndHandleRequest();
    } else {
      // If the user clears out the field, then show all bots
      findBotsWithGraphs();
    }
  }, [debouncedBot]);

  const handleBotSearch = () => {
    const onFindBotsSuccess = (response) => {
      if (response.data.pager && response.data.pager.currentPage) {
        setCurrentPage(response.data.pager.currentPage);
      }
      setBots(response.data);
    };
    const onFindBotsError = (error) => {
      console.log('ERROR: ', error.response);
    };
    BotService.FindBotSearch(botsSearch, sortSearch, onFindBotsSuccess, onFindBotsError);
  };

  const handleKeypress = (e) => {
    // it triggers by pressing the enter key
    if (e.which === 13) {
      handleBotSearch();
    }
  };

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
        <div className="bots_header-container_banner">

          <h3 className="bots_title">Stock market for bots.</h3>
        </div>
      </div>

      <div className="bots_search-frame">
        <div className="bots_search-main_frame">
          <div className="search_icon" />
          <Autocomplete
            style={{ border: '1px solid red' }}
            inputProps={{
              name: 'user',
              placeholder: 'Search bots...',
              style: {
                margin: '24px 0px', fontFamily: 'Poppins', fontSize: '17px', lineHeight: '18px',
              },
              className: 'bots_search',
              // eslint-disable-next-line no-restricted-globals
              onKeyPress: (event) => {
                handleKeypress(event);
              },
            }}
            wrapperStyle={{
            }}
            menuStyle={{
              borderRadius: '3px',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
              background: '#19192c',
              border: '1.5px solid #252538',
              padding: '10px 10px',
              position: 'fixed',
              overflow: 'auto',
              maxHeight: '50%',
            }}
            getItemValue={(item) => item.displayName}
            items={botSearchResults || []}
            renderItem={(item) => (
              <div
                key={item.id}
                style={{
                  background: '#19192c',
                  border: '1.5px solid #252538',
                  color: 'white',
                  fontFamily: 'Poppins',
                  fontSize: '18px',
                  lineHeight: '18px',
                  cursor: 'pointer',
                }}
              >
                <span>
                  {item.displayName}
                </span>
              </div>
            )}
            renderMenuItemChildren={(option) => (
              <div key={option.id}>
                <span style={{ fontSize: '20px' }}>{option.displayName}</span>
              </div>
            )}
            onSelect={(value) => {
              setBotsSearch(value);
            }}
            value={botsSearch}
            onChange={handleChange}
          />
        </div>
        <div className="search_divider" style={{ margin: '15px 10px' }} />
        <div className="filter_icon" style={{ margin: '20px 10px' }} />
        <select style={{ margin: '21px 0px' }} defaultValue="" name="sortBy" onChange={handleSelectionChange}>
          <option value="" disabled>Sort...</option>
          {selectOptions.botSortOptions.map((option) => (
            <option key={option.value} value={option.value} label={option.label} />
          ))}
        </select>
        <div
          className="bots_search-btn"
          role="button"
          tabIndex={0}
          aria-label="Home page header"
          aria-hidden="true"
          onClick={() => {
            if (botsSearch || sortSearch) {
              handleBotSearch();
            }
          }}
          style={{ opacity: (!botsSearch && !sortSearch) ? '0.6' : '1' }}
        >
          <span
            className="bots_search-btn_text"

          >
            Search

          </span>
        </div>
      </div>

      <div className="bots_search_results-container">
        <p className="panel_text-light">
          {Object.keys(bots).length > 0 && bots.pageOfItems && bots.pager && (
            <>
              {`Showing ${bots.pager.startIndex + 1 || 0}-${bots.pager.endIndex + 1 || 0} results of ${bots.pager.totalItems} bots.`}
            </>
          )}
        </p>
      </div>

      <div className="bots_panel-container">
        {Object.keys(bots).length > 0 && bots.pageOfItems.length > 0 && bots.pageOfItems.map((bot) => {
          const {
            _id, displayName, logo, mostRecentSale, highestSale,
          } = bot;
          let createdAt;
          let price;
          let type;
          if (mostRecentSale) {
            ({ createdAt, price, type } = mostRecentSale);
          }
          return (
            <BotPanel key={_id} name={displayName} iconUrl={logo} lastTransactionDate={createdAt} lastTransactionType={type} lastTransactionPrice={price} highestSale={highestSale} />
          );
        })}
      </div>
      <PageSwitch currentPage={currentPage} totalPages={bots.pager && bots.pager.totalPages} />
      <Footer />
    </>
  );
};

export default BotsSearch;
