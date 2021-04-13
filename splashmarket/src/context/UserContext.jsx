import React, { useReducer, createContext } from 'react';

export const UserContext = createContext(null);

export const SET_USER = 'SET_USER';

const initialState = {
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
<<<<<<< HEAD
<<<<<<< HEAD
  transactionsMMd: 0,
  isLoggedIn: false,
<<<<<<< HEAD
=======
>>>>>>> 4d6591f... Finishing user dashboard
=======
  transactionsMMd: 0,
>>>>>>> 87cb574... Finished with dashboard admin and user
=======
>>>>>>> 739e7cf... Cleaning up
};

const reducer = (state, action) => {
  if (action.type === SET_USER) {
    return { ...action.payload.value };
  }
  return state;
};

export const UserContextProvider = (props) => {
  const { passedInValue, children } = props;
  const [state, dispatch] = useReducer(reducer, passedInValue || initialState);
  return <UserContext.Provider value={[state, dispatch]}>{children}</UserContext.Provider>;
};
