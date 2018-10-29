import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from '../src/components/home/index';
import Login from '../src/components/login/index';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

ReactDOM.render(
  <Router history={browserHistory}>
      <Route path='/' component={App}>
          <IndexRoute component={Home} />
          <Route path='/login' component={Login} />
      </Route>
  </Router>
  , document.getElementById('root'));
registerServiceWorker();
