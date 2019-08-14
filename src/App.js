import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import store, { history } from './store';
import routes from './Routes';

class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              {routes.map(({ title, pageLink, component }) => (
                <Route
                  exact
                  key={title}
                  path={pageLink}
                  component={component}
                />
              ))}
            </Switch>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
