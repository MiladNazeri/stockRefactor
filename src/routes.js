import React from 'react';
import { Route, IndexRoute } from 'react-router';

/* containers */
import App from './components/app.js';
import Home from './components/home.js';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route status={404} path="*" component={Home} />
  </Route>
);
