import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
import Routes from './Routes';

const App = () => (
  <Router>
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  </Router>
=======
import Routes from './Routes';

const App = () => (
  <Routes />
>>>>>>> 1477cb1... Added eslint and router
);

export default App;
