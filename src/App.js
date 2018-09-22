import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom'
import Login from './login/index';

class App extends Component {

  login() {
    ReactDOM.render(
      <Login />,
      document.getElementById('center')
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div id="center">
          <p className="App-intro">
            <a href="#" onClick={() => {this.login()}}>LOGIN</a>
          </p>
        </div>
      </div>
    );
  }
}

export default App;
