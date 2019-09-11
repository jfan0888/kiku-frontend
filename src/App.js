import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { history } from './redux/store';
import { fetchLotsInfo, fetchUserInfo, getTNS } from './redux/reducers/actions';
import { RECEIVE_USER_INFO } from './redux/reducers/actions';
import oConfig from './config';
import routes from './Routes';

class App extends React.Component {
  state = {
    logged: false
  };

  componentDidMount() {
    this.props.Login();
  }

  render() {
    const { user, lots } = this.props;

    return user.data && user.data.id && (lots.data || !lots.isFetching) ?
      <div className="app-container">
        <Router history={history}>
          <Switch>
            {routes.map(({ title, pageLink, component }) => (
              <Route
                exact
                key={title}
                path={`${process.env.PUBLIC_URL}${pageLink}`}
                component={component}
              />
            ))}
          </Switch>
        </Router>
      </div> : null
  }
}

export default connect(
  state => state,
  dispatch => ({
    Login: () =>
      dispatch(getTNS()) // translations
        .then(() => dispatch(fetchUserInfo()))  // get user info if logged in the same browser
        .then((data) => {
          const { payload } = data;
          if (Array.isArray(payload) && !payload.length) {
            window.location.href = oConfig.getParam('domain') + oConfig.getParam('login_redirect_link');
            return;
          }

          return data;
        })
        .then(({ type }) => {
          if (type === RECEIVE_USER_INFO)
            return dispatch(fetchLotsInfo());
        })
  })
)(App);