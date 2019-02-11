import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Autocomplete from '../../helpers/autoComplete';
import 'bootstrap/dist/css/bootstrap.min.css';
import MaskedInput from 'react-text-mask'
import { Card, CardBody, Form, Label, Input, Row, Col, Button, FormGroup } from 'reactstrap';
import ViaCep from '../../lib/react-via-cep/dist/index';
import { loadOccupations } from '../../actions/occupations';
import { createUser } from '../../actions/user';
import  { validateUser, masks }  from "../../helpers/validations";

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { cep: '', uf: '', localidade: '', bairro: '', logradouro: '', occupation: ''};
    this.handleChangeCep = this.handleChangeCep.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.changeUf = this.changeUf.bind(this);
    this.changeCidade = this.changeCidade.bind(this);
    this.changeBairro = this.changeBairro.bind(this);
    this.changeLogradouro = this.changeLogradouro.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(loadOccupations());
  }

  changeOccupation(occupation) {
    this.setState({
      ...this.state,
      occupation,
    });
  }

  handleChangeCep(event) {
    this.setState({ ...this.state, cep: event.target.value })
  }

  handleSuccess(data) {
    this.setState({ ...this.state, uf: data.uf, localidade: data.localidade, bairro: data.bairro, logradouro: data.logradouro });
  }

  changeUf(event) {
    this.setState({ uf: event.target.value });
  }

  changeCidade(event) {
    this.setState({ localidade: event.target.value });
  }

  changeBairro(event) {
    this.setState({ bairro: event.target.value });
  }

  changeLogradouro(event) {
    this.setState({ logradouro: event.target.value });
  }

  getOccupationId() {
    const { occupations } = this.props;
    const { occupation } = this.state;

    const occupationsArray = [];
    for (var key in occupations) {
      occupationsArray.push(occupations[key]);
    }
    const occ = occupationsArray.find(x => x.termo === occupation);

    return occ.id;
  }

  handleSubmit(event) {
    const { dispatch } = this.props;
    event.preventDefault();
    const data = new FormData(event.target);

    const valid = validateUser({
      cpf: data.get('cpf'),
      cep: data.get('cep'),
      telefoneCel: data.get('telefoneCel'),
      senha: document.getElementById("senha").value,
      senhaConf: document.getElementById("senhaConf").value,
    });
      
    if(valid.invalid) {
      alert(valid.message);
      return;
    }
    
    dispatch(createUser(
      data.get("nome"),
      data.get("email"),
      document.getElementById("senha").value,
      data.get("cpf").replace(/\D+/g, ''),
      data.get("escolaridade"),
      data.get("cep").replace(/\D+/g, ''),
      data.get("uf"),
      data.get("localidade"),
      data.get("bairro"),
      data.get("logradouro"),
      data.get("numero"),
      data.get("complemento"),
      data.get("categoria"),
      this.getOccupationId(),
      data.get("telefoneCel").replace(/\D+/g, ''),
    ));
  }

  render() {
    const { occupations } = this.props;

    const occupationsTermos = [];
    for (var key in occupations) {
      occupationsTermos.push(occupations[key].termo.toString());
    }

    return (
      <div className="container">
        <Row>
          <Col sm='2' md='3' lg='4' xs='1' />
          <Col sm='6' md='5' lg='4' xs='10' style={{ textAlign: 'center' }}><h2>Cadastre-se</h2></Col>
        </Row>
        <Row>
          <Col sm='1' md='2' lg='3' xs='1' />
          <Col sm='8' md='7' lg='6' xs='10'>
            <Card>
              <CardBody>
                <Form
                  id="formSubmissao"
                  name="formSubmissao"
                  className="container"
                  onSubmit={this.handleSubmit}
                >
                  <FormGroup>
                    <Label className="label">Nome *</Label>
                    <Input
                      ref="title"
                      type="text"
                      name="nome"
                      id="nome"
                      className="input"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="label">CPF *</Label>
                    <Input
                      ref="title"
                      type="text"
                      name="cpf"
                      id="cpf"
                      className="input"
                      mask={masks.cpf}
                      tag={MaskedInput}
                      required
                    />
                  </FormGroup>
                  <ViaCep cep={this.state.cep} onSuccess={this.handleSuccess} lazy>
                    {({ data, loading, error, fetch }) => {
                      if (loading) {
                        return <p>Pesquisando CEP...</p>
                      }
                      if (error) {
                        return console.log('CEP inválido!');
                      }
                      if (data) {
                        if (data.erro === true) {
                          return <div>
                            <FormGroup>
                              <Label className="label">CEP *</Label>
                              <Input
                                ref="body"
                                type="text"
                                name="cep"
                                id="cep"
                                className="input"
                                mask={masks.cep}
                                tag={MaskedInput}
                                onChange={this.handleChangeCep} value={this.state.cep}
                                required
                              />
                            </FormGroup>
                            <div style={{ marginTop: -12, fontSize: 12, color: 'red' }}>CEP Inválido</div>
                            <button onClick={fetch}>Pesquisar</button>
                          </div>
                        }
                        return <div>
                          <Row>
                            <Col xs="auto">
                              <FormGroup>
                                <Label className="label">CEP *</Label>
                                <Input
                                  ref="body"
                                  type="text"
                                  name="cep"
                                  id="cep"
                                  className="input"
                                  mask={masks.cep}
                                  tag={MaskedInput}
                                  value={data.cep}
                                  style={{ width: '150px' }}
                                  required
                                />
                              </FormGroup>
                            </Col>
                            <Col xs="auto">
                              <FormGroup>
                                <Label className="label">Cidade *</Label>
                                <Input
                                  ref="title"
                                  type="text"
                                  name="localidade"
                                  id="localidade"
                                  className="input"
                                  required
                                  value={this.state.localidade}
                                  onChange={this.changeCidade}
                                  style={{ width: '150px' }}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs="auto">
                              <FormGroup>
                                <Label className="label">Estado *</Label>
                                <Input
                                  ref="title"
                                  type="text"
                                  name="uf"
                                  id="uf"
                                  className="input"
                                  required
                                  value={this.state.uf}
                                  onChange={this.changeUf}
                                  style={{ width: '50px' }}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <FormGroup>
                            <Label className="label">Bairro *</Label>
                            <Input
                              ref="title"
                              type="text"
                              name="bairro"
                              id="bairro"
                              className="input"
                              required
                              value={this.state.bairro}
                              onChange={this.changeBairro}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label className="label">Logradouro *</Label>
                            <Input
                              ref="title"
                              type="text"
                              name="logradouro"
                              id="logradouro"
                              className="input"
                              required
                              value={this.state.logradouro}
                              onChange={this.changeLogradouro}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label className="label">Número *</Label>
                            <Input
                              ref="title"
                              type="text"
                              name="numero"
                              id="numero"
                              className="input"
                              required
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label className="label">Complemento</Label>
                            <Input
                              ref="title"
                              type="text"
                              name="complemento"
                              id="complemento"
                              className="input"
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>Categoria *</Label>
                            <Input
                              ref='title'
                              type='select'
                              name='categoria'
                              id='categoria'
                              maxLength="50"
                              style={{ width: '300px' }}
                              required
                            >
                              <option ref="1" value={1} className="optionGroup">Residencial</option>
                              <option ref="2" value={2} className="optionGroup">Comercial</option>
                            </Input>
                          </FormGroup>
                        </div>
                      }
                      return <div>
                        <FormGroup>
                          <Label className="label">CEP *</Label>
                          <Input
                            ref="body"
                            type="text"
                            name="cep"
                            id="cep"
                            className="input"
                            mask={masks.cep}
                            tag={MaskedInput}
                            onChange={this.handleChangeCep} value={this.state.cep}
                            required
                          />
                        </FormGroup>
                        <button onClick={fetch}>Pesquisar</button>
                      </div>
                    }}
                  </ViaCep>
                  <FormGroup>
                    <Label className="label">Telefone Celular * </Label>
                    <Input
                      ref="title"
                      type="text"
                      name="telefoneCel"
                      id="telefoneCel"
                      className="input"
                      mask={masks.cellphone}
                      tag={MaskedInput}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="label">Telefone Fixo</Label>
                    <Input
                      ref="title"
                      type="text"
                      name="telefoneFix"
                      id="telefoneFix"
                      className="input"
                      mask={masks.phone}
                      tag={MaskedInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="label">E-mail *</Label>
                    <Input
                      ref="title"
                      type="email"
                      name="email"
                      id="email"
                      className="input"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="label">Nível de Escolaridade *</Label>
                    <Input
                      type="select"
                      name="escolaridade"
                      id="escolaridade"
                      className="escolaridade"
                      required
                    >
                      <option value="Ensino Fundamental Incompleto">Ensino Fundamental Incompleto</option>
                      <option value="Ensino Fundamental Completo">Ensino Fundamental Completo</option>
                      <option value="Ensino Médio Incompleto">Ensino Médio Incompleto</option>
                      <option value="Ensino Médio Completo">Ensino Médio Completo</option>
                      <option value="Ensino Superior Incompleto">Ensino Superior Incompleto</option>
                      <option value="Ensino Superior Completo">Ensino Superior Completo</option>
                      <option value="Mestrando(a)">Mestrando(a)</option>
                      <option value="Mestre(a)">Mestre(a)</option>
                      <option value="Doutorando(a)">Doutorando(a)</option>
                      <option value="Doutor(a)">Doutor(a)</option>
                      <option value="PhD">PhD</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label className="label">Profissão *</Label>
                    <br/>
                    <Autocomplete
                      suggestions={occupationsTermos}
                      changeOccupation={this.changeOccupation.bind(this)}
                    />
                  </FormGroup>
                  <FormGroup>
                  <Label className="label">Senha *</Label>
                    <Input
                      ref="title"
                      name="senha"
                      label="Senha *"
                      type="password"
                      id="senha"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                  <Label className="label">Confirme sua senha *</Label>
                    <Input
                      ref="title"
                      name="senhaConf"
                      label="Confirme sua senha *"
                      type="password"
                      id="senhaConf"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Button
                      type="submit"
                      onClick={this.handleSubmission}
                      value="Submit"
                      name="Cadastrar"
                      className="btn"
                      color="primary"
                      style={{
                        display: "block",
                        margin: "0 auto"
                      }}
                    >
                      Cadastrar
                </Button>
                  </FormGroup>
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

Register.propTypes = {
  occupations: PropTypes.object,
};

const mapStateToProps = ({ occupations }) => ({
  occupations,
});

export default connect(mapStateToProps)(Register);
