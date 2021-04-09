import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
import Routes from './Routes';

const App = () => (
  <Router>
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  </Router>
);

export default App;
