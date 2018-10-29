import React, { Component } from 'react';
import Index from '../src/components/sidebar/index';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Index />
        <div style={{ marginTop: 90 }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
