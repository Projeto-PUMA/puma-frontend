import React, { Component } from "react";
import {browserHistory} from 'react-router';
import axios from "axios";
import * as jwt_decode from "jwt-decode";
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
      .post(path + "/auth/login", {
        cpf: data.get("username"),
        senha: data.get("password")
      })
      .then(response => {
        this.setLogin(response);
      })
      .catch(function(error) {
        if (error) {
          console.log(error)
          alert("Usuário ou senha incorreto!");
        }
      });
  }

  setLogin(response) {
    if (response.status === 200) {
      console.log("Login Bem Sucedido");
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ token: response.data.token })
      );
      let tokenInfo = this.getDecodedAccessToken(this.getToken());
      console.log("tokenInfo = "+tokenInfo.papel)
      localStorage.setItem(
        "authorities",
        JSON.stringify(tokenInfo.papel)
      );
      // browserhistory to redirect
      browserHistory.push('/submeterprojeto');
    }
  }

  getToken() {
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    var token = currentUser && currentUser.token;
    return token ? token : null;
  }

  getDecodedAccessToken(token) {
    try {
      console.log(jwt_decode(token))
      console.log(token)
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
            <Label>CPF *</Label>
            <Input
            ref="username"
            type="text"
            name='username'
            id='username'
            maxLength="11"
            required
            />

            <Label>Senha *</Label>
            <Input
            ref="password"
            type="password"
            name='password'
            id='password'
            required
            />
          <Button type="submit" value ="submit" color="primary" style={{ display: "block",margin: "0 auto", marginTop: 30 }}>
          Entrar
          </Button>
          </Form> 
        </CardBody>
        <footer>
            <p>* Campo Obrigatório</p>
          </footer>
      </Card>
      </Col>
      </Row>
      </div>
      
    );
  }
}

export default Login;
