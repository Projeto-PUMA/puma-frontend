import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import axios from 'axios';
import * as Store from '../../store';
import {
  Button,
  Col,
  Row,
  Card,
  CardBody,
  Form,
  Label,
  Input
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


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
      localStorage.setItem('currentUser', JSON.stringify({ token: response.data.token }));
      browserHistory.push('/submeterprojeto');
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
