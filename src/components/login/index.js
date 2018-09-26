import React, { Component } from "react";
import axios from "axios";
import * as jwt_decode from "jwt-decode";
import ReactDOM from "react-dom";
import Home from "../home/index";
import * as Store from "../../store";
import {Button,Col,Row,Card,CardBody,Form,Label,Input} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";


class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();

    var data = new FormData(e.target);

    const path = Store["backend"].path; // This is backend path
    axios
      .post(path + "/auth", {
        username: data.get("username"),
        password: data.get("password")
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
        <Row>
          <Col sm='2' md='3' lg='4' xs='1'/>
          <Col sm='7' md='7' lg='7' xs='10'><h2 style={{display:'inline-block',}}>Acesse sua Conta</h2></Col>
        </Row>
        <Row>
        <Col sm='2' md='3' lg='4' xs='1'/>
        <Col sm='6' md='5' lg='4' xs='10'>
        <Card>
        <CardBody>
          <Form
          id='loginForm'
          name='loginForm'
          onSubmit={this.handleLogin}
          >
            <Label>CPF</Label>
            <Input
            ref="username"
            type="text"
            name='username'
            id='username'
            />

            <Label>Senha</Label>
            <Input
            ref="password"
            type="password"
            name='password'
            id='password'
            />
          <Button type="submit" value ="submit" color="primary" style={{ display: "block",margin: "0 auto"}}>
          Entrar
          </Button>
          </Form> 
        </CardBody>
      </Card>
      </Col>
      </Row>
      </div>
      
    );
  }
}

export default Login;
