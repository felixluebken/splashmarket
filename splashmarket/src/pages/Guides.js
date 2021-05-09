/* eslint-disable no-underscore-dangle */
import React, { useState, useContext, useEffect } from 'react';
import './Guides.css';
import Autocomplete from 'react-autocomplete';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { UserContext } from '../context/UserContext';
import HeaderGuide from '../components/header/headerGuide';
import Footer from '../components/footer/footer';
import PageSwitch from '../components/page-switch/PageSwitch';
import useQuery from '../helpers/useQuery';
import GuideBotPanel from '../components/panels/GuideBotPanelUser';
import GuidesAdminAddPopup from '../popups/GuidesAdminAddPopup';
import GuideService from '../services/GuideService';
import BotService from '../services/BotService';
import selectOptions from '../helpers/selectOptions';

const Guides = () => {
  const history = useHistory();
  const [guides, setGuides] = useState(null);
  const [pager, setPager] = useState({
    totalPages: 0,
    totalItems: 0,
  });
  const [validBots, setValidBots] = useState([]);
  const [user] = useContext(UserContext);
  const [isAddBotModalVisible, setIsAddBotModalVisible] = useState(false);
  const { role } = user;
  const pageQuery = useQuery().get('page') || 1;
  const [currentPage, setCurrentPage] = useState(1);
  const [botsSearch, setBotsSearch] = useState('');
  const [filterSearch, setFilterSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const handleToggleAddBotModal = () => {
    setIsAddBotModalVisible(!isAddBotModalVisible);
  };

  const handleChange = (event) => {
    if (event.target.name === 'filterBy') {
      setFilterSearch(event.target.value);
    } else {
      setBotsSearch(event.target.value);
    }
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

  const getGuides = () => {
    const onGetGuidesSuccess = (response) => {
      if (response.data.pager) {
        setPager(response.data.pager);
        setCurrentPage(response.data.pager.currentPage);
      }

      setGuides(response.data.pageOfItems);
    };
    const onGetGuidesError = (error) => {
      console.log('ERROR: ', error.response);
    };
    GuideService.GetBotGuides(pageQuery, onGetGuidesSuccess, onGetGuidesError);
  };

  const sortGuides = (a, b, value) => {
    const aLower = a.botName.toLowerCase();
    const bLower = b.botName.toLowerCase();
    const valueLower = value.toLowerCase();
    const queryPosA = aLower.indexOf(valueLower);
    const queryPosB = bLower.indexOf(valueLower);
    if (queryPosA !== queryPosB) {
      return queryPosA - queryPosB;
    }
    return aLower < bLower ? -1 : 1;
  };

  const handleBotGuideSearch = () => {
    if (!botsSearch && !filterSearch) {
      history.push({ pathname: '/guides/search', search: 'bot=all&page=1' });
    } else if (!botsSearch && filterSearch) {
      history.push({ pathname: '/guides/search', search: `filter=${filterSearch}&page=1` });
    } else if (botsSearch && !filterSearch) {
      history.push({ pathname: '/guides/search', search: `bot=${botsSearch}&page=1` });
    } else if (botsSearch && filterSearch) {
      history.push({ pathname: '/guides/search', search: `bot=${botsSearch}&filter=${filterSearch}&page=1` });
    }
  };

  useEffect(() => {
    getGuides();
    getValidBots();
  }, []);

  useEffect(() => {
    if (guides && validBots) {
      setIsLoading(false);
    }
  }, [guides, validBots]);

  useEffect(() => {
    getGuides();
  }, [pageQuery]);

  const handleKeypress = (e) => {
    // it triggers by pressing the enter key
    if (e.which === 13) {
      handleBotGuideSearch();
    }
  };

  const handleDelete = async (id) => {
    const onDeleteSuccess = () => {
      const newGuides = [...guides];
      const foundIndex = guides.findIndex((guide) => guide._id === id);
      newGuides.splice(foundIndex, 1);
      setGuides(newGuides);
    };
    const onDeleteError = () => {
      console.log('ERROR DELETING GUIDE');
    };
    await GuideService.DeleteBotGuide(id, onDeleteSuccess, onDeleteError);
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
      {isAddBotModalVisible && (
      <GuidesAdminAddPopup getGuides={getGuides} handleToggleAddBotModal={handleToggleAddBotModal} validBots={validBots} />
      )}

      <div className="guides_header-container">
        <HeaderGuide />
        <div className="guides_header-container_banner">
          <h3 className="guides_title">Bot Information & Guides</h3>
        </div>
      </div>

      <div className="search-frame_guides">
        <div className="search_icon" />
        <Autocomplete
          style={{ border: '1px solid red' }}
          sortItems={guides && guides.length > 0 && sortGuides}
          shouldItemRender={(item, value) => item.botName.toLowerCase().indexOf(value.toLowerCase()) > -1}
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
          getItemValue={(item) => item.botName}
          items={guides || []}
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
                {item.botName}
              </span>
            </div>
          )}
          renderMenuItemChildren={(option) => (
            <div key={option.id}>
              <span style={{ fontSize: '20px' }}>{option.botName}</span>
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
          <option>Filter...</option>
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

      {user && role === 'admin' && (
      <div className="guides_admin-button-container">
        <div
          className="guides_admin-add_button"
          role="button"
          tabIndex={0}
          aria-label="Home page header"
          aria-hidden="true"
          style={{ cursor: 'pointer' }}
          onClick={handleToggleAddBotModal}
        >
          <span
            className="guides_admin-button_text"

          >
            Add Bot
          </span>
        </div>
      </div>
      )}
      <div className="guides_search_results-container">
        <p className="panel_text-light">
          {pager && Object.keys(pager).length > 0 && (
          <>
            {`Showing ${pager.startIndex + 1 || 0}-${pager.endIndex + 1 || 0} results of ${pager.totalItems} Bot Guides.`}
          </>
          )}
        </p>
      </div>
      <div className="guides_panel-container">
        {guides && guides.map((guide) => {
          const {
            botName, fileContents, tags, _id,
          } = guide;
          let imgURL;
          if (fileContents && fileContents.buffer) {
            // eslint-disable-next-line new-cap
            const img = new Buffer.from(fileContents.buffer).toString('base64');
            imgURL = `data:image/png;base64,${img}`;
          }
          return (
            <GuideBotPanel iconBackgroundColor="black" botName={botName || ''} iconUrl={imgURL || ''} tags={tags || []} id={_id} handleDelete={handleDelete} isAdmin={role === 'admin' || false} />
          );
        })}
      </div>
      <PageSwitch totalPages={pager.totalPages || 1} currentPage={currentPage || 1} />
      <Footer />
    </>
  );
};
export default Guides;
