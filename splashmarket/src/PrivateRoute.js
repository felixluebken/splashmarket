/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
import { useHistory, Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props) => {
  const {
    children, isAuthenticating, isAuthenticated, ...rest
  } = props;
  const history = useHistory();

  if (isAuthenticating) {
    return 'Authenticating';
  }

  return (
    isAuthenticated ? (
      <Route {...rest}>
        {children}
      </Route>
    ) : <Redirect to={{ pathname: '/login', state: { from: history.location.pathname } }} />
  );
};

export default PrivateRoute;
