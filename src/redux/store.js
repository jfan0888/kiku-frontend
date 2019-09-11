import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import { createBrowserHistory } from 'history';

const oLogger = createLogger();

const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(oLogger, thunkMiddleware))
);

export { history, store };
