import React, { Component } from 'react';
import Home from '../src/components/home/index';
import Navbar from '../src/components/navbar/index';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Home />
      </div>
    );
  }
}

export default App;
