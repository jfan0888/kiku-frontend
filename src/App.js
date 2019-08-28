import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store, { history } from './store';
import routes from './Routes';

const App = () => (
  <div className="app-container">
    <Provider store={store}>
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
    </Provider>
  </div>
);

export default App;
