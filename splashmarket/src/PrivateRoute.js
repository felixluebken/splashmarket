import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from './context/UserContext';

const PrivateRoute = (props) => {
  const { children, isAuthenticating } = props;
  const history = useHistory();
  const [user] = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (!isAuthenticating && user.isLoggedIn) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      history.push('/');
    }
  }, []);

  if (isAuthenticating) {
    return 'Authenticating';
  }
  return (
    isAuthenticated ? children : null
  );
};

export default PrivateRoute;
