import React, { useState, useContext, useEffect } from 'react';
import './Leaderboard.css';
import { useHistory } from 'react-router-dom';
import Autocomplete from 'react-autocomplete';
import moment from 'moment';
import HeaderLeaderboard from '../components/header/headerLeaderboard';
import Footer from '../components/footer/footer';
import SearchPhrasePanel from '../components/small-panels/searchPhrases';
import LeaderboardSearchPanel from '../components/panels/LeaderboardSearchPanel';
import selectOptions from '../helpers/selectOptions';
import { SearchContext, SET_SEARCH_RESULTS } from '../context/SearchContext';
import UseDebounce from '../helpers/useDebounce';
import UserService from '../services/UserService';
import useQuery from '../helpers/useQuery';

const Leaderboard = (props) => {
  const [isSearching, setIsSearching] = useState(true);
  const history = useHistory();

  const [searchParameters, setSearchParameters] = useState({
    user: '',
    sortBy: '',
  });
  const [searchResults, dispatch] = useContext(SearchContext);
  const [selected, setSelected] = useState(false);
  const [currentSearch, setCurrentSearch] = useState('');
  const debouncedUser = UseDebounce(searchParameters.user, 1000);
  const userQuery = useQuery().get('user');
  const sortByQueries = useQuery().get('sortBy');

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
      setIsSearching(false);
    };

    const onSearchUserError = (error) => {
      setIsSearching(false);
    };

    await UserService.FindUserSearch(query, onSearchUserSuccess, onSearchUserError);
    setIsSearching(false);
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
    setIsSearching(false);
  };

  useEffect(() => {
    if (debouncedUser) {
      makeAndHandleRequest();
    }
  }, [debouncedUser]);

  useEffect(() => {
    if (searchParameters.user) {
      setCurrentSearch(searchParameters.user);
    }
  }, [searchParameters.user]);

  useEffect(() => {
    // If there are queries given, automatically search
    if ((userQuery || sortByQueries) && searchResults.results.length === 1) {
      const query = {
        user: userQuery,
        sortBy: sortByQueries,
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
        setIsSearching(false);
      };

      const onSearchUserError = (error) => {
        console.log('ERROR: ', error.response);
        setIsSearching(false);
      };

      UserService.FindUserSearch(query, onSearchUserSuccess, onSearchUserError);
    }
  }, []);

  const removeSearchParameter = () => {
    setCurrentSearch('');
    setSearchParameters({ ...searchParameters, user: '' });
    dispatch({ type: SET_SEARCH_RESULTS, payload: { ...searchResults, results: [], currentSearch: '' } });
    history.push(
      '/leaderboard',
    );
  };

  return (
    <>
      <HeaderLeaderboard />
      <div className="leaderboard_search-section">
        <h3 className="leaderboard_title">Find any member.</h3>

        <div className="search-frame">
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
                setIsSearching(true);
                handleSearch();
              }}
            >
              Search
            </span>
          </div>
        </div>
      </div>

      <div className="leaderboard_body-section">
        <div className="leaderboard_body-current_search">
          <div className="leaderboard_body-current_search-terms-container">
            <p className="text-normal">Current Search</p>
            <div className="leaderboard_body-current_search-terms">
              {currentSearch && (
              <SearchPhrasePanel searchTerm={currentSearch} removeSearchParameter={removeSearchParameter} />
              )}
            </div>
          </div>

          <div className="leaderboard_body-current_search-categories-container">
            <p className="text-normal" style={{ marginBottom: '20px' }}>Refine by Categories</p>

            <div className="checkbox-container">
              <input type="checkbox" className="checkbox" />
              <p className="text-light-small" style={{ margin: '3px 0px 0px 0px' }}>Most Transactions</p>
            </div>

            <div className="checkbox-container">
              <input type="checkbox" className="checkbox" />
              <p className="text-light-small" style={{ margin: '3px 0px 0px 0px' }}>Oldest Join Date</p>
            </div>

            <div className="checkbox-container">
              <input type="checkbox" className="checkbox" />
              <p className="text-light-small" style={{ margin: '3px 0px 0px 0px' }}>Newest Join Date</p>
            </div>
          </div>

        </div>

        <div className="leaderboard_body-results">
          <p className="text-light">
            {!userQuery && !sortByQueries && 'Search for a member, or pick a sort category above.'}
            {isSearching && (userQuery || sortByQueries || searchParameters.user || searchParameters.sortBy) && 'Searching for results...'}
            {!isSearching && (userQuery || sortByQueries) && (
              <>
                {searchResults.results.length >= 1 && searchResults.results[0].username !== 'No users found' ? (
                  <>
                    {`Showing ${searchResults.results.length} result(s)`}
                  </>
                ) : 'There are no results to show.'}
              </>
            )}

          </p>
          <div className="leaderboard_body-results-container">
            {searchResults.results && searchResults.results.length >= 1 && searchResults.results[0].username !== 'No users found' && searchResults.results.map((searchResult) => {
              const {
                createdAt, avatar, transactions, username, discriminator, transactionsLength,
              } = searchResult;
              const memberSince = moment(createdAt).format('MMMM DD, YYYY');
              const lastTransaction = transactions && transactions.length >= 0 ? transactions[transactions.length - 1] : null;
              let lastTransactionDate;
              let lastTransactionUsername;
              let lastTransactionAvatar;
              if (lastTransaction) {
                if (lastTransaction.createdAt) {
                  lastTransactionDate = moment(lastTransaction.createdAt).format('MMMM DD, YYYY');
                }
                if (lastTransaction.username) {
                  lastTransactionUsername = lastTransaction.username;
                }
                if (lastTransaction.avatar) {
                  lastTransactionAvatar = lastTransaction.avatar;
                }
              }
              let lastFourTransactions;

              // Get last four transactions
              if (transactions && transactions.length > 0) {
                const transactionsCopy = [...transactions];
                lastFourTransactions = transactionsCopy.slice(0, transactionsCopy.length - 1);
              }

              return (
                <LeaderboardSearchPanel
                  username={`${username}${discriminator ? `#${discriminator}` : ''}`}
                  memberSince={memberSince || ''}
                  avatarUrl={avatar}
                  transactionsLength={transactionsLength || 0}
                  transactions={lastFourTransactions || []}
                  lastTransaction={lastTransactionDate || 'N/A'}
                  latestTransactionUsername={lastTransactionUsername || 'Trade'}
                  latestTransactionAvatarUrl={lastTransactionAvatar || null}
                />
              );
            })}
            {/* <LeaderboardSearchPanel
              username="dearchitect#7745"
              memberSince="Jan 1, 2012"
              avatarUrl="https://cdn.discordapp.com/avatars/638784999293976635/06d1e75f49559a1b16e6d127ec1c4fbf.jpg"
              transactions="100"
              lastTransaction="Mar 24, 2021"
              latestTransactionUsername="dearchitect#7745"
              latestTransactionAvatarUrl="https://cdn.discordapp.com/avatars/638784999293976635/06d1e75f49559a1b16e6d127ec1c4fbf.jpg"
            />
            <LeaderboardSearchPanel username="sapatos#7745" memberSince="Jan 1, 2012" /> */}
          </div>
        </div>
      </div>

      <Footer />
    </>

  );
};

export default Leaderboard;
