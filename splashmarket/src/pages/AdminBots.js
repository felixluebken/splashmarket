/* eslint-disable no-underscore-dangle */
import React, { useContext, useState, useEffect } from 'react';
import './Blogs.css';
import Autocomplete from 'react-autocomplete';
import AdminBotPanel from '../components/panels/AdminBotPanel';
import HeaderBlogs from '../components/header/headerBlogs';
import Footer from '../components/footer/footer';

import PageSwitch from '../components/page-switch/PageSwitch';
import { UserContext } from '../context/UserContext';
import BlogsEditPopup from '../popups/BlogsEditPopup';
import BlogService from '../services/BlogService';
import useQuery from '../helpers/useQuery';
import BotService from '../services/BotService';
import GuidesValidBotAdminEditPopup from '../popups/GuidesValidBotAdminEditPopup';
import UseDebounce from '../helpers/useDebounce';

const AdminBots = () => {
  const [user] = useContext(UserContext);
  const [isToggleModalVisible, setIsToggleModalVisible] = useState(false);
  const [bots, setBots] = useState(null);
  const [botEditing, setBotEditing] = useState(null);
  const [botList, setBotList] = useState([]);
  const [botSearchResults, setBotSearchResults] = useState([{ displayName: 'There are no results to show' }]);
  const [isLoading, setIsLoading] = useState(true);
  const [botsSearch, setBotsSearch] = useState('');
  const debouncedBot = UseDebounce(botsSearch, 1000);

  const [currentPage, setCurrentPage] = useState(1);
  const pageQuery = useQuery().get('page') || 1;
  const [pager, setPager] = useState({
    totalPages: 0,
    totalItems: 0,
  });
  const { role = 'member' } = user;

  const handleToggleModal = () => {
    setIsToggleModalVisible(!isToggleModalVisible);
  };

  const getBots = () => {
    const onGetBotsSuccess = (response) => {
      console.log('RESPONSE: ', response.data);
      if (response.data.pager) {
        setPager(response.data.pager);
        setCurrentPage(response.data.pager.currentPage);
      }
      if (response.data.pageOfItems && response.data.pageOfItems.length > 0) {
        setBots(response.data.pageOfItems);

        setBots(response.data.pageOfItems);
      } else {
        setBots(response.data.pageOfItems);
      }
    };
    const onGetBotsError = (error) => {
      console.log('ERROR: ', error.response);
    };
    BotService.GetAllAdminBots(pageQuery, onGetBotsSuccess, onGetBotsError);
  };

  const handleDeleteBot = (id) => {
    const onDeleteBotSuccess = () => {
      getBots();
    };

    const onDeleteBlogError = (error) => {
      console.log('ERROR GETTING DROPLETS: ', error.response);
    };

    BotService.DeleteAdminBot(id, onDeleteBotSuccess, onDeleteBlogError);
  };

  const handleSetBotToEdit = (bot) => {
    setBotEditing(bot);
    handleToggleModal();
  };

  useEffect(() => {
    getBots();
  }, [pageQuery]);

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
    await BotService.SearchAdminBot(botsSearch, onBotSearchSuccess, onBotSearchError);
  };

  const getAllBotsList = async () => {
    const onFindBotsSuccess = (response) => {
      console.log('RESPONSE FIND ALL BOTS: ', response.data);
      setBotList(response.data);
      setIsLoading(false);
    };
    const onFindBotsError = (error) => {
      console.log('ERROR: ', error.response);
      setIsLoading(false);
    };
    BotService.GetAllBots(onFindBotsSuccess, onFindBotsError);
  };

  const handleBotSearch = () => {
    const onFindBotsSuccess = (response) => {
      console.log('RESPONSE: ', response.data);
      if (response.data.pager && response.data.pager.currentPage) {
        setCurrentPage(response.data.pager.currentPage);
      }
      setBots(response.data.pageOfItems);
    };
    const onFindBotsError = (error) => {
      console.log('ERROR: ', error.response);
    };
    BotService.FindAdminBotSearch(botsSearch, onFindBotsSuccess, onFindBotsError);
  };

  const handleKeypress = (e) => {
    // it triggers by pressing the enter key
    if (e.which === 13) {
      handleBotSearch();
    }
  };

  useEffect(() => {
    getAllBotsList();

    if (debouncedBot) {
      makeAndHandleRequest();
    } else {
      // If the user clears out the field, then show all bots
      getBots();
    }
  }, [debouncedBot]);

  const handleChange = (event) => {
    setBotsSearch(event.target.value);
  };

  return (
    <>
      {isToggleModalVisible && (
      <GuidesValidBotAdminEditPopup toggleModal={handleToggleModal} getBots={getBots} bot={botEditing} setBot={setBotEditing} />
      )}
      <HeaderBlogs />
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
        <div className="bots_search-btn">
          <span
            className="bots_search-btn_text"
            role="button"
            tabIndex={0}
            aria-label="Home page header"
            aria-hidden="true"
            onClick={() => {
              handleBotSearch();
            }}
          >
            Search

          </span>
        </div>
      </div>
      <div className="blogs_panel-container">
        {user && role === 'admin' && (
        <div className="guides_admin-button-container" style={{ width: '75%', margin: '10px 10%' }}>
          <div
            className="guides_admin-add_button"
            role="button"
            tabIndex={0}
            aria-label="Home page header"
            aria-hidden="true"
            style={{ cursor: 'pointer' }}
            onClick={handleToggleModal}
          >
            <span
              className="guides_admin-button_text"
            >
              Add Bot
            </span>
          </div>
        </div>
        )}

        <div className="guides_panel-container" style={{ margin: 0, width: '100%' }}>
          {bots && bots.map((bot) => {
            const {
              displayName, validRenewalTypes, values, logo, _id,
            } = bot;
            return (
              <AdminBotPanel iconBackgroundColor="black" botName={displayName} iconUrl={logo || ''} bot={bot} id={_id} validRenewalTypes={validRenewalTypes} values={values} handleDelete={handleDeleteBot} handleEdit={handleSetBotToEdit} />
            );
          })}
        </div>
      </div>
      <PageSwitch totalPages={(pager && pager.totalPages) || 1} currentPage={(pager && currentPage) || 1} />
      <Footer />
    </>
  );
};

export default AdminBots;
