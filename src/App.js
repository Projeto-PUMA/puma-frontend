import React, { Component } from 'react';
import Index from '../src/components/sidebar/index';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import Login from './components/login/index';

class App extends Component {
  render() {
    return (
      <div>
        <Router>  
          <Switch>
            <Route path="/login" component={Login} /> 
            <Route path="/" component={Index} />
          </Switch>
        </Router>
        {/* <Index /> */}
      </div>
    );
  }
}

export default App;
