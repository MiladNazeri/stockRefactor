import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import { Router, browserHistory } from 'react-router';
import App from './components/app';
import promiseMiddleware from 'redux-promise-middleware';

import routes from './routes';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(
    promiseMiddleware()
)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.container'));
