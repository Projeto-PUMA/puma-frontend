import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Login from '../src/components/login/index';

const styles = {
  navbar: {
    backgroundColor: '#222',
  },
  title: {
    color: '#fff',
  }
};

class App extends Component {

  login() {
    ReactDOM.render(
      <Login />,
      document.getElementById('center')
    );
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        <div style={styles.navbar}>
          <span style={styles.title}>PUMA</span>
        </div>
        <div id="center">
          <p>
            <a href="#" onClick={() => {this.login()}}>LOGIN</a>
          </p>
        </div>
      </div>
    );
  }
}

export default App;
