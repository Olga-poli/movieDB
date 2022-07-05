import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Catalog from '../pages/Catalog';
import MovieInfo from '../pages/MovieInfo';
import ActorInfo from '../pages/ActorInfo';
import MovieEditing from '../pages/MovieEditing';

function Routes(props) {
  const { activeUserState, setActiveUserState } = props;

  return (
    <Switch>
      <Route path="/catalog" activeUserState={activeUserState}>
        {activeUserState
          ? ({ match }) => (
            <Switch>
              <Route path={`${match.path}/:movieID`}>
                {() => (
                  <Switch>
                    <Route path={`${match.path}/:movieID/edit`}>
                      <MovieEditing customProp={match.path} />
                    </Route>
                    <Route path={`${match.path}/:movieID/:actor`}>
                      <ActorInfo customProp={match.path} />
                    </Route>
                    <Route path={`${match.path}/:movieID`}>
                      <MovieInfo customProp={match.path} />
                    </Route>
                  </Switch>
                )}
              </Route>
              <Route path={`${match.path}`}>
                <Catalog />
              </Route>
            </Switch>
          )
          : <Redirect to="/login" />}
      </Route>
      <Route path="/login" activeUserState={activeUserState} setActiveUserState={setActiveUserState}>
        {activeUserState
          ? <Redirect to="/catalog" />
          : <Login setActiveUserState={setActiveUserState} />}
      </Route>
      <Route path="/register" activeUserState={activeUserState} setActiveUserState={setActiveUserState}>
        {activeUserState
          ? <Redirect to="/catalog" />
          : <Register setActiveUserState={setActiveUserState} />}
      </Route>
      <Route exact path="/">
        {activeUserState
          ? <Redirect to="/catalog" />
          : <Redirect to="/login" />}
      </Route>
      <Route path="*">
        <h1>Not found</h1>
      </Route>
    </Switch>
  );
}

Routes.defaultProps = {
  activeUserState: PropTypes.shape({}),
};

Routes.propTypes = {
  activeUserState: PropTypes.shape({
    name: PropTypes.string,
    password: PropTypes.string,
    isLogged: PropTypes.bool,
  }),
  setActiveUserState: PropTypes.func.isRequired,
};

export default Routes;