import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { SearchContextProvider } from './context/SearchContext';
import { UserContextProvider } from './context/UserContext';
import { UserSearchContextProvider } from './context/UserSearchContext';
import Routes from './Routes';

const App = () => (
  <Router>
    <SearchContextProvider>
      <UserContextProvider>
        <UserSearchContextProvider>
          <Routes />
        </UserSearchContextProvider>
      </UserContextProvider>
    </SearchContextProvider>
  </Router>
);

export default App;
