import React, { useState, useContext, useEffect } from 'react';
import './Guides.css';
import { useHistory } from 'react-router-dom';
import Autocomplete from 'react-autocomplete';
import useQuery from '../helpers/useQuery';
import HeaderGuide from '../components/header/headerGuide';
import Footer from '../components/footer/footer';
import PageSwitch from '../components/page-switch/PageSwitch';
import SearchPhrasePanel from '../components/small-panels/searchPhrases';

import GuideBotPanel from '../components/panels/GuideBotPanelUser';
import { UserContext } from '../context/UserContext';
import GuideService from '../services/GuideService';
import BotService from '../services/BotService';
import selectOptions from '../helpers/selectOptions';

/*
currentResults          -str
totalResults            -str

*/

const GuidesSearch = () => {
  const history = useHistory();
  const [guides, setGuides] = useState(null);
  const [filteredGuides, setFilteredGuides] = useState(null);
  const [pager, setPager] = useState({});
  const [validBots, setValidBots] = useState([]);
  const pageQuery = useQuery().get('page') || 1;
  const filterQuery = useQuery().get('filter');
  const botQuery = useQuery().get('bot');
  const [currentPage, setCurrentPage] = useState(1);
  const [botsSearch, setBotsSearch] = useState('');
  const [filterSearch, setFilterSearch] = useState('');
  const [categoryFilters, setCategoryFilters] = useState([]);

  const handleBotGuideSearch = () => {
    const onFindBotGuidesSuccess = (response) => {
      if (response.data.pager && response.data.pager.currentPage) {
        setCurrentPage(response.data.pager.currentPage);
      }
      setPager(response.data.pager);
      setGuides(response.data.pageOfItems);
    };
    const onFindBotsError = (error) => {
      console.log('ERROR: ', error.response);
    };

    GuideService.FindBotGuidesWithFilter(botQuery, filterQuery, pageQuery, onFindBotGuidesSuccess, onFindBotsError);
  };

  const getValidBots = async () => {
    const onGetValidBotsSuccess = (response) => {
      setValidBots(response.data);
    };
    const onGetValidBotsError = (error) => {
      console.log('ON GET VALID BOTS ERROR: ', error.response);
    };

    await BotService.GetAllBots(onGetValidBotsSuccess, onGetValidBotsError);
  };

  useEffect(() => {
    handleBotGuideSearch();
    getValidBots();
  }, []);

  useEffect(() => {
    handleBotGuideSearch();
  }, [pageQuery]);

  useEffect(() => {
    if (botsSearch && filterSearch) {
      history.push({ search: `bot=${botsSearch}&filter=${filterSearch}` });
    } else if (filterSearch) {
      history.push({ search: `filter=${filterSearch}` });
    } else if (botsSearch) {
      history.push({ search: `bot=${botsSearch}` });
    } else {
      history.push({ search: 'bot=all' });
    }
  }, [botsSearch, filterSearch]);

  const handleKeypress = (e) => {
    // it triggers by pressing the enter key
    if (e.which === 13) {
      handleBotGuideSearch();
    }
  };

  const sortBots = (a, b, value) => {
    const aLower = a.displayName.toLowerCase();
    const bLower = b.displayName.toLowerCase();
    const valueLower = value.toLowerCase();
    const queryPosA = aLower.indexOf(valueLower);
    const queryPosB = bLower.indexOf(valueLower);
    if (queryPosA !== queryPosB) {
      return queryPosA - queryPosB;
    }
    return aLower < bLower ? -1 : 1;
  };

  const handleChange = (event) => {
    if (event.target.name === 'filterBy') {
      setFilterSearch(event.target.value);
    } else {
      setBotsSearch(event.target.value);
    }
  };

  const removeSearchParameter = (searchTerm) => {
    const filterRegex = new RegExp((`filter=${searchTerm}`), 'gmi');
    const botRegex = new RegExp((`bot=${searchTerm}`), 'gmi');
    let newSearchURL;
    if (filterRegex.test(history.location.search)) {
      newSearchURL = history.location.search.replace(filterRegex, '');
    }
    if (botRegex.test(history.location.search)) {
      newSearchURL = history.location.search.replace(botRegex, '');
    }
    history.push({ search: newSearchURL });
  };

  const handleCategoryFilter = (event) => {
    if (!categoryFilters.includes(event.target.name)) {
      setCategoryFilters([...categoryFilters, event.target.name]);
    } else {
      setCategoryFilters(categoryFilters.filter((filter) => filter !== event.target.name));
    }
  };

  useEffect(() => {
    if (guides && guides.length > 0 && categoryFilters.length > 0) {
      const newFilteredGuides = guides.filter((guide) => categoryFilters.every((filter) => guide.tags.includes(filter)));
      setFilteredGuides(newFilteredGuides);
    } else if (categoryFilters.length === 0) {
      setFilteredGuides(null);
    }
  }, [categoryFilters]);

  return (
    <>
      <div className="guides_header-container">
        <HeaderGuide />
        <div className="guides_header-container_banner">
          <h3 className="guides_title">Bot information & guides</h3>
        </div>
      </div>

      <div className="search-frame_guides">
        <div className="search_icon" />
        <Autocomplete
          style={{ border: '1px solid red' }}
          sortItems={validBots && validBots.length > 0 && sortBots}
          shouldItemRender={(item, value) => item.displayName.toLowerCase().indexOf(value.toLowerCase()) > -1}
          inputProps={{
            name: 'user',
            placeholder: 'Search Bot Guides...',
            style: {
              margin: '24px 0px', fontFamily: 'Poppins', fontSize: '17px', lineHeight: '18px', width: '50%',
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
          items={validBots || []}
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
        <div className="search_divider" style={{ margin: '15px 10px' }} />
        <div className="filter_icon" style={{ margin: '20px 10px' }} />
        <select className="guides_filter" style={{ margin: '21px 0px' }} defaultValue="" name="filterBy" onChange={handleChange}>
          <option value="">Filter...</option>
          {selectOptions.botGuidesFilterOptions.map((option) => <option key={option.value} value={option.label} label={option.label} />)}

        </select>
        <div className="blue_button-search" style={{ margin: '15px' }}>
          <span
            className="blue_button-search-text"
            role="button"
            tabIndex={0}
            aria-label="Home page header"
            aria-hidden="true"
            onClick={() => {
              handleBotGuideSearch();
            }}
          >
            Search
          </span>
        </div>
      </div>

      <div className="guides_panel-container">
        <div className="guides_search-current_search">
          <div className="guides_search-current_search-terms-container">
            <p className="text-normal">Current Search</p>
            <div className="guides_search-current_search-terms">
              {botQuery && !filterQuery && (
              <SearchPhrasePanel searchTerm={botQuery} removeSearchParameter={removeSearchParameter} />
              )}
              {botQuery && filterQuery && (
                <>
                  <SearchPhrasePanel searchTerm={botQuery} removeSearchParameter={removeSearchParameter} />
                  <SearchPhrasePanel searchTerm={filterQuery} removeSearchParameter={removeSearchParameter} />
                </>
              )}
              {filterQuery && !botQuery && (
              <>
                <SearchPhrasePanel searchTerm={filterQuery} removeSearchParameter={removeSearchParameter} />
              </>
              )}
            </div>
          </div>

          <div className="guides_search-current_search-categories-container">
            <p className="text-normal" style={{ marginBottom: '20px' }}>Refine by categories</p>
            {selectOptions.botGuidesFilterOptions.map((option) => (
              <div
                className="checkbox-container"
              >
                <input
                  type="checkbox"
                  className="checkbox"
                  name={option.label}
                  checked={categoryFilters.includes(option.label)}
                  onClick={handleCategoryFilter}
                />
                <p className="text-light-small" style={{ margin: '3px 0px 0px 0px' }}>{option.label}</p>
              </div>
            ))}

          </div>

        </div>

        <div className="guides_search-results">
          <div className="guides_search_results-container" style={{ margin: '20px 0px 10px 0px' }}>
            <p className="panel_text-light">
              {!filteredGuides && pager && Object.keys(pager).length > 0 && (
                <>
                  {`Showing ${pager.startIndex + 1 || 0}-${pager.endIndex + 1 || 0} results of ${pager.totalItems} Bot Guides.`}
                </>
              )}
              {filteredGuides && filteredGuides.length && pager && Object.keys(pager).length > 0 && (
                <>
                  {`Showing ${filteredGuides.length}-${pager.endIndex + 1 || 0} results of ${pager.totalItems} Bot Guides.`}
                </>
              )}
            </p>
          </div>
          <div className="guides_search-results-container">
            {!filteredGuides && guides && guides.map((guide) => {
              const { botName, fileContents, tags } = guide;
              let imgURL;
              if (fileContents && fileContents.buffer) {
                // eslint-disable-next-line new-cap
                const img = new Buffer.from(fileContents.buffer).toString('base64');
                imgURL = `data:image/png;base64,${img}`;
              }
              return (
                <GuideBotPanel iconBackgroundColor="black" botName={botName || ''} iconUrl={imgURL || ''} tags={tags || []} />
              );
            })}
            {categoryFilters && filteredGuides && filteredGuides.map((guide) => {
              const { botName, fileContents, tags } = guide;
              let imgURL;
              if (fileContents && fileContents.buffer) {
                // eslint-disable-next-line new-cap
                const img = new Buffer.from(fileContents.buffer).toString('base64');
                imgURL = `data:image/png;base64,${img}`;
              }
              return (
                <GuideBotPanel iconBackgroundColor="black" botName={botName || ''} iconUrl={imgURL || ''} tags={tags || []} />
              );
            })}

          </div>

        </div>

      </div>

      <PageSwitch totalPages={(pager && pager.totalPages) || 1} currentPage={(pager && currentPage) || 1} />

      <Footer />
    </>
  );
};
export default GuidesSearch;
