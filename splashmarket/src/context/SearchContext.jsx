import React, { useReducer, createContext } from 'react';

export const SearchContext = createContext(null);

export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';

const initialState = {
  currentSearch: '',
  results: [{
    username: 'No users found',
  }],
  queries: [],
};

const reducer = (state, action) => {
  if (action.type === SET_SEARCH_RESULTS) {
    return action.payload;
  }
  return state;
};

export const SearchContextProvider = (props) => {
  const { passedInValue, children } = props;
  const [state, dispatch] = useReducer(reducer, passedInValue || initialState);
  return <SearchContext.Provider value={[state, dispatch]}>{children}</SearchContext.Provider>;
};
