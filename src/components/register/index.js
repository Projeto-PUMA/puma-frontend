import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AvForm, AvField } from "availity-reactstrap-validation";
import axios from "axios";
// eslint-disable-next-line
import * as Store from "../../store";
import MaskedInput from 'react-text-mask'
import { Card, CardBody, Form, Label, Input, Row, Col, Button, FormGroup } from 'reactstrap';
import { browserHistory } from 'react-router';
import ViaCep from 'react-via-cep';

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { cep: '', uf: '', localidade: '', bairro: '', logradouro: '' };

    this.handleChangeCep = this.handleChangeCep.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.changeUf = this.changeUf.bind(this);
    this.changeCidade = this.changeCidade.bind(this);
    this.changeBairro = this.changeBairro.bind(this);
    this.changeLogradouro = this.changeLogradouro.bind(this);
  }

  cpfmask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  cellphonemask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  phonemask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  cepmask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  validateCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF === "00000000000")
      return false;

    for (var i = 1; i <= 9; i++) {
      Soma = Soma + parseInt(strCPF.substring(i - 1, i), 10) * (11 - i);
    }
    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11)) {
      Resto = 0;
    }
    if (Resto !== parseInt(strCPF.substring(9, 10), 10))
      return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) {
      Soma = Soma + parseInt(strCPF.substring(i - 1, i), 10) * (12 - i);
    }
    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11))
      Resto = 0;
    if (Resto !== parseInt(strCPF.substring(10, 11), 10))
      return false;

    return true;
  }

  validateCEP(strCEP) {
    if (strCEP.length < 8) {
      return false;
    } else {
      return true;
    }
  }

  validateMainPhone(strPhone) {
    if (strPhone.length < 11) {
      return false;
    } else {
      return true;
    }
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

  componentWillMount() {
		const path = Store['backend'].path; // This is backend path
		axios.get(path + '/profissao')
			.then( response => this.getProfissoes(response))
			.catch(() => { alert('Erro ao processar lista de profissões!') });
  }

  getProfissoes(response) {
    if (response.status === 200) {
      console.log("Lista de profissões recebida!");
      localStorage.setItem(
        "profissoes",
        JSON.stringify({ profissoes: response.data })
      );
    }
  }

  setProfissoes(){
    var profissoes = localStorage.getItem('profissoes');
    console.log('Profissoes: ', JSON.parse(profissoes));
    return profissoes;
  }
  
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    if (!this.validateCPF(data.get('cpf').replace(/\D+/g, ''))) {
      alert('CPF inválido!');
      return;
    }

    if (!this.validateCEP(data.get('cep').replace(/\D+/g, ''))) {
      alert('CEP inválido');
      return;
    }

    if (!this.validateMainPhone(data.get('telefoneCel').replace(/\D+/g, ''))) {
      alert('Telefone principal inválido');
      return;
    }

    if (document.getElementById("senha").value !== document.getElementById("senhaConf").value) {
      alert('A senha de confirmação não coincide!');
      return;
    }

    const path = Store["backend"].path; // This is backend path
    axios
      .post(path + "/usuario", {
        nome: data.get("nome"),
        cpf: data.get("cpf").replace(/\D+/g, ''),
        email: data.get("email"),
        senha: document.getElementById("senha").value,
        escolaridade: data.get("escolaridade"),
        endereco: {
          estado: data.get("uf"),
          cep: data.get("cep").replace(/\D+/g, ''),
          cidade: data.get("localidade"),
          bairro: data.get("bairro"),
          rua: data.get("logradouro"),
          numero: data.get("numero"),
          complemento: data.get("complemento"),
          endereco_categoria_id: data.get("categoria")
        },
        telefone: {
          telefone: data.get("telefoneCel").replace(/\D+/g, ''),
        }
        // phoneAlternative: data.get("telefoneFix").replace(/\D+/g, ''),
        // profession: data.get("profissao"),
      })
      .then(() => {
        alert("Usuário cadastrado com sucesso!");
        browserHistory.push('/login');
      })
      .catch(function (error) {
        if (error) {
          console.log(error);
          console.log(path + "/usuario", {
            nome: data.get("nome"),
            cpf: data.get("cpf").replace(/\D+/g, ''),
            email: data.get("email"),
            senha: document.getElementById("senha").value,
            escolaridade: data.get("escolaridade"),
            endereco: {
              estado: data.get("uf"),
              cep: data.get("cep").replace(/\D+/g, ''),
              cidade: data.get("localidade"),
              bairro: data.get("bairro"),
              rua: data.get("logradouro"),
              numero: data.get("numero"),
              complemento: data.get("complemento"),
              endereco_categoria_id: data.get("categoria")
            },
            telefone: {
              telefone: data.get("telefoneCel").replace(/\D+/g, ''),
            }
            // phoneAlternative: data.get("telefoneFix").replace(/\D+/g, ''),
            // profession: data.get("profissao"),
          })
          alert("Erro ao cadastrar! CPF já cadastrado.");
        }
      });
    // } else return alert("Erro ao cadastrar!");
  }

  render() {
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
                      mask={this.cpfmask}
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
                                mask={this.cepmask}
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
                                  mask={this.cepmask}
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
                            mask={this.cepmask}
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
                      mask={this.cellphonemask}
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
                      mask={this.phonemask}
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
                    <Input
                      name="profissao"
                      id="profissao"
                      type="text"
                      className="input"
                      maxLength="35"
                      required
                    />
                  </FormGroup>
                  <AvForm name="formSenha">
                    <AvField
                      name="senha"
                      label="Senha *"
                      type="password"
                      id="senha"
                      required
                      errorMessage="Digite uma senha entre 6 e 16 digitos!"
                      validate={{
                        required: { value: true }, minLength: { value: 6 },
                        maxLength: { value: 16 }
                      }}
                    />
                    <AvField
                      name="senhaConf"
                      label="Confirme sua senha *"
                      type="password"
                      required
                      errorMessage="Suas senhas não conferem!"
                      validate={{
                        match: { value: "senha" }, required: { value: true }, minLength: { value: 6 },
                        maxLength: { value: 16 }
                      }}
                    />
                  </AvForm>
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

export default Register;
