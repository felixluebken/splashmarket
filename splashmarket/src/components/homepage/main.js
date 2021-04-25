/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useContext } from 'react';
import './homepage.css';
import Autocomplete from 'react-autocomplete';
import { useHistory } from 'react-router-dom';
import selectOptions from '../../helpers/selectOptions';
import UserService from '../../services/UserService';
import UseDebounce from '../../helpers/useDebounce';
import { SearchContext, SET_SEARCH_RESULTS } from '../../context/SearchContext';

const HomepageSearch = () => {
  const history = useHistory();
  const [searchParameters, setSearchParameters] = useState({
    user: '',
    sortBy: '',
  });
  const [searchResults, dispatch] = useContext(SearchContext);
  const [selected, setSelected] = useState(false);

  const debouncedUser = UseDebounce(searchParameters.user, 1000);

  const handleChange = (event) => {
    setSearchParameters({ ...searchParameters, [event.target.name]: event.target.value });
  };

  const handleSearch = async () => {
    const query = {
      user: searchParameters.user,
      sortBy: searchParameters.sortBy,
    };
    const onSearchUserSuccess = (response) => {
      // This sets the context of the search results for the leader board search page
      dispatch({
        type: SET_SEARCH_RESULTS,
        payload: {
          ...searchResults,
          results: response.data,
          currentSearch: searchParameters.user,
          queries: [searchParameters.sortBy],
        },
      });
      history.push({
        pathname: '/leaderboard',
        search: `?user=${searchParameters.user}&sortBy=${searchParameters.sortBy}`,
      });
    };

    const onSearchUserError = (error) => {
      console.log('ERROR: ', error.response);
    };

    await UserService.FindUserSearch(query, onSearchUserSuccess, onSearchUserError);
  };

  const makeAndHandleRequest = async () => {
    const query = {
      user: searchParameters.user,
    };
    // This sets search results for the debounce
    const onSearchUserSuccess = (response) => {
      dispatch({
        type: SET_SEARCH_RESULTS,
        payload: {
          ...searchResults,
          results: response.data,
        },
      });
    };
    const onSearchUserError = (error) => {
      console.log('ERROR: ', error.response);
    };
    await UserService.FindUserSearch(query, onSearchUserSuccess, onSearchUserError);
  };

  useEffect(() => {
    if (debouncedUser) {
      makeAndHandleRequest();
    }
  }, [debouncedUser]);

  return (
    <div className="main_section">
      <div className="main_section-frame">
        <h1 style={{ textAlign: 'center', marginBottom: '60px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h1>
      </div>
      <div className="search-frame_homepage">
        <div className="search_icon" />
        <Autocomplete
          style={{ border: '1px solid red' }}
          inputProps={{
            name: 'user',
            placeholder: 'Search members...',
            style: {
              margin: '24px 0px', fontFamily: 'Poppins', fontSize: '17px', lineHeight: '18px',
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
          placeholder="Search Members..."
          getItemValue={(item) => item.username}
          items={searchResults.results}
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
                {item.username}
              </span>
            </div>
          )}
          renderMenuItemChildren={(option) => (
            <div key={option.id}>
              <span style={{ fontSize: '20px' }}>{option.username}</span>
            </div>
          )}
          onSelect={(value) => {
            setSearchParameters({ ...searchParameters, user: value });
            setSelected(!selected);
          }}
          value={searchParameters.user}
          onChange={handleChange}
        />
        <div className="search_divider" style={{ margin: '15px 10px' }} />
        <div className="filter_icon" style={{ margin: '20px 10px' }} />
        <select style={{ margin: '21px 0px' }} defaultValue="" name="sortBy" onChange={handleChange}>
          <option value="">Sort...</option>
          {selectOptions.sortOptions.map((option, index) => (
            <option value={option.value} label={option.label} />
          ))}
        </select>
        <div className="blue_button-search" style={{ margin: '15px' }}>
          <span
            className="blue_button-search-text"
            role="button"
            tabIndex={0}
            aria-label="Home page header"
            aria-hidden="true"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleSearch();
            }}
          >
            Search

          </span>
        </div>
      </div>
    </div>
  );
};

export default HomepageSearch;
