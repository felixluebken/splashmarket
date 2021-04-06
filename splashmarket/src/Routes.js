import React from 'react';
import {
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Homepage from './pages/Homepage';
import Loginpage from './pages/Login';

const Routes = () => {
  const history = useHistory();
  console.log('HISTORY: ', history);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/login">
          <Loginpage />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
