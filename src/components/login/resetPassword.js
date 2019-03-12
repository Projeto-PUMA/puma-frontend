import React, { Component } from 'react';
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
  import Loading from '../../helpers/loading';

export default class ResetPassword extends Component {

    // handleResetPassword(e) {
    //     e.preventDefault();
    //     var data = new FormData(e.target);
    
    //     const { dispatch } = this.props;
    
    //     dispatch(setUser({
    //       cpf: data.get("username"),
    //       senha: data.get("password")
    //     }));
    //   }

      render() {
        const { loading } = this.props;
    
        if (loading) {
          return <Loading />;
        }
    
        return (
          <div>
            <Row>
              <Col sm='2' md='3' lg='4' xs='1'/>
              <Col sm='7' md='7' lg='7' xs='10'><h2 style={{display:'inline-block',}}>Esqueci Minha Senha</h2></Col>
            </Row>
            <Row>
            <Col sm='2' md='3' lg='4' xs='1'/>
            <Col sm='6' md='5' lg='4' xs='10'>
            <Card>
            <CardBody>
              <Form
              id='loginForm'
              name='loginForm'
            //   onSubmit={this.handleLogin}
            onSubmit={console.log("Recuperar Senha")}
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

              <Button type="submit" value ="submit" color="primary" style={{ display: "block",margin: "0 auto", marginTop: 30 }}>
              Recuperar Senha
              </Button>
              </Form> 
            </CardBody>
          </Card>
          </Col>
          </Row>
          </div>
          
        );
      }
};
