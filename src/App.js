import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import routes from './Routes';

const history = createBrowserHistory();
class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Router history={history}>
          <Switch>
            {routes.map(({ title, pageLink, component }) => (
              <Route exact key={title} path={pageLink} component={component} />
            ))}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
