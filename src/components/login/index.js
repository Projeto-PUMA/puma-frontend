import React, { Component } from "react";
import axios from "axios";
import * as jwt_decode from "jwt-decode";
import ReactDOM from "react-dom";
import Home from "../home/index";
import * as Store from "../../store";
import { Button } from "reactstrap";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();

    const data = {};
    for (const field in this.refs) {
      data[field] = this.refs[field].value;
    }

    const path = Store["backend"].path; // This is backend path
    axios
      .post(path + "/auth", {
        username: data["username"],
        password: data["password"]
      })
      .then(response => {
        this.setLogin(response);
      })
      .catch(function(error) {
        if (error) {
          alert("Usuário não cadastrado!");
        }
      });
  }

  setLogin(response) {
    if (response.status === 200) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ token: response.data.token })
      );
      let tokenInfo = this.getDecodedAccessToken(this.getToken());
      localStorage.setItem(
        "authorities",
        JSON.stringify(tokenInfo.authorities)
      );
      ReactDOM.render(<Home />, document.getElementById("center"));
    }
  }

  getToken() {
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    var token = currentUser && currentUser.token;
    return token ? token : null;
  }

  getDecodedAccessToken(token) {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  getUserId() {
    try {
      let token = this.getToken();
      let tokenInfo = jwt_decode(token);
      return tokenInfo.id;
    } catch (Error) {
      return null;
    }
  }

  isAuthenticated() {
    // get the auth token from localStorage
    let token = localStorage.getItem("currentUser");
    // check if token is set, then...
    if (token) {
      return true;
    }
    return false;
  }

  logout() {
    try {
      if (localStorage.getItem("currentUser")) {
        localStorage.removeItem("authorities");
        localStorage.removeItem("currentUser");
        return true;
      } else {
        return false;
      }
    } catch (Error) {
      return false;
    }
  }

  render() {
    return (
      <div /*style={{height: "100vh"}}*/>
        <form>
          <label>
            CPF:
            <input ref="username" type="text" name="username" />
          </label>
          <label>
            Senha:
            <input ref="password" type="password" name="password" />
          </label>
        </form>
        <Button type="submit" color="primary" onClick={this.handleLogin}>
          Entrar
        </Button>
      </div>
    );
  }
}

export default Login;
