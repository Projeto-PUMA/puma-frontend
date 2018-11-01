import React, { Component } from 'react';
import Index from '../src/components/sidebar/index';

class App extends Component {
  render() {
    return (
      <div className="container" style={{ width: '100%', height: '100%' }}>
        <Index />
        <div style={{ marginTop: 90, width: '100%', height: '100%' }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
