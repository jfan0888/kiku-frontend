import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
});

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk)
    // window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
