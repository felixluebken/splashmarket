import React, { useReducer, createContext } from 'react';

export const UserSearchContext = createContext(null);

export const SET_USER = 'SET_USER';

export const initialState = {
  id: '',
  username: '',
  avatar: '',
  discriminator: '',
  roles: [],
  transactions: [],
  totalBought: 0,
  totalSold: 0,
  totalTrade: 0,
  currency: 0,
  subscriptionActive: false,
  transactionsMMd: 0,
  isLoggedIn: false,
  showTransactions: true,
};

const reducer = (state, action) => {
  if (action.type === SET_USER) {
    return { ...action.payload.value };
  }
  return state;
};

export const UserSearchContextProvider = (props) => {
  const { passedInValue, children } = props;
  const [state, dispatch] = useReducer(reducer, passedInValue || initialState);
  return <UserSearchContext.Provider value={[state, dispatch]}>{children}</UserSearchContext.Provider>;
};
