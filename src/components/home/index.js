import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Login from '../login/index';

class Home extends Component {

  login() {
    ReactDOM.render(
      <Login />,
      document.getElementById('center')
    );
  }

  logout() {
    try{
      if(localStorage.getItem('currentUser')){
        localStorage.removeItem('authorities');
        localStorage.removeItem('currentUser');
        window.location.reload();
        return true;
      }
      else {
        return false;
      }
    }
    catch(Error){
      return false;
    }
  }

  render() {
    const login = <a href="#" onClick={() => {this.login()}}>LOGIN</a>;

    var logged = false;

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser && currentUser.token;
    if(token) {
      logged = true;
    }

    const logout = <a href="#" onClick={() => {this.logout()}}>LOGOUT</a>;

    return (
      <div id="center">
        <h1>BEM VINDO AO PUMA</h1>
        <p>
          {logged ? logout : login}       
        </p>
      </div>
    );
  }
}

export default Home;
