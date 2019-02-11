import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import { setUser } from '../../actions/user';
import Loading from '../../helpers/loading';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();
    var data = new FormData(e.target);

    const { dispatch } = this.props;

    dispatch(setUser({
      cpf: data.get("username"),
      senha: data.get("password")
    }));
  }

  render() {
    const { loading } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <div>
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

Login.propTypes = {
	loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
	loading: state.meta.syncOperation.isLoading,
});

export default connect(mapStateToProps)(Login);
