import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AvForm, AvField } from "availity-reactstrap-validation";
import axios from "axios";
// eslint-disable-next-line
import * as Store from "../../store";
import MaskedInput from 'react-text-mask'


import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody
} from "reactstrap";

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  cpfmask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-' , /\d/, /\d/];
  cellphonemask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  phonemask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  cepmask  = [/\d/, /\d/, /\d/, /\d/, /\d/, '-' , /\d/, /\d/, /\d/];


  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    const path = Store["backend"].path; // This is backend path
    axios
      .post(path + "/register", {
        name: data.get("nome"),
        username: data.get("cpf").replace(/\D+/g, ''),
        cep: data.get("cep").replace(/\D+/g, ''),
        fullAddress: data.get("endereco"),
        phonePrincipal: data.get("telefoneCel").replace(/\D+/g, ''),
        phoneAlternative: data.get("telefoneFix").replace(/\D+/g, ''),
        education: data.get("escolaridade"),
        profession: data.get("profissao"),
        password: document.getElementById("senha").value,
        email: data.get("email")
      })
      .then(() => {
        alert("Usuário cadastrado com sucesso!");
      })
      .catch(function(error) {
        if (error) {
          console.log(data.get(["formSenha"]["senha"]));
          alert("Erro ao cadastrar!");
        }
      });
    // } else return alert("Erro ao cadastrar!");
  }

  render() {
    return (
       <div className="container">
        <Card>
          <CardBody>
            <Form
              id="formSubmissao"
              name="formSubmissao"
              className="container"
              onSubmit={this.handleSubmit}
            >
              <FormGroup>
                <Label className="label">Nome</Label>
                <Input
                  ref="title"
                  type="text"
                  name="nome"
                  id="nome"
                  className="input"
                />
              </FormGroup>
              <FormGroup>
                <Label className="label">CPF</Label>
                <Input
                  ref="title"
                  type="text"
                  name="cpf"
                  id="cpf"
                  className="input"
                  mask={this.cpfmask}
                  tag={MaskedInput}
                />
              </FormGroup>
              <FormGroup>
                <Label className="label">CEP </Label>
                <Input
                  ref="body"
                  type="text"
                  name="cep"
                  id="cep"
                  className="input"
                  mask={this.cepmask}
                  tag={MaskedInput}
                />
              </FormGroup>
              <FormGroup>
                <Label className="label">Endereço</Label>
                <Input
                  ref="title"
                  type="text"
                  name="endereco"
                  id="endereco"
                  className="input"
                />
              </FormGroup>
              <FormGroup>
                <Label className="label">Telefone Celular</Label>
                <Input
                  ref="title"
                  type="text"
                  name="telefoneCel"
                  id="telefoneCel"
                  className="input"
                  mask={this.cellphonemask}
                  tag={MaskedInput}
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
                <Label className="label">E-mail</Label>
                <Input
                  ref="title"
                  type="text"
                  name="email"
                  id="email"
                  className="input"
                />
              </FormGroup>
              <FormGroup>
                <Label className="label">Nível de Escolaridade</Label>
                <Input
                  type="select"
                  name="escolaridade"
                  id="escolaridade"
                  className="escolaridade"
                >
                  <option value="Ensino Fundamental Incompleto">
                    Ensino Fundamental Incompleto
                  </option>
                  <option value="Ensino Fundamental Completo">
                    Ensino Fundamental Completo
                  </option>
                  <option value="Ensino Médio Incompleto">
                    Ensino Médio Incompleto
                  </option>
                  <option value="Ensino Médio Completo">
                    Ensino Médio Completo
                  </option>
                  <option value="Ensino Superior Incompleto">
                    Ensino Superior Incompleto
                  </option>
                  <option value="Ensino Superior Completo">
                    Ensino Superior Completo
                  </option>
                  <option value="Mestrando(a)">Mestrando(a)</option>
                  <option value="Mestre(a)">Mestre(a)</option>
                  <option value="Doutorando(a)">Doutorando(a)</option>
                  <option value="Doutor(a)">Doutor(a)</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label className="label">Profissão</Label>
                <Input
                  name="profissao"
                  id="profissao"
                  type="text"
                  className="input"
                />
              </FormGroup>
              {/* <FormGroup>
                <Label className="label">Senha</Label>
                <Input type="password" name="senha" />
              </FormGroup>
              <FormGroup>
                <Label className="label">Confirme sua senha</Label>
                <Input type="password" name="senhaConf" />
              </FormGroup> */}
              <FormGroup>
                <AvForm name="formSenha">
                  <AvField
                    name="senha"
                    label="senha"
                    type="password"
                    id="senha"
                  />
                  <AvField
                    name="senhaConf"
                    label="senha"
                    type="password"
                    errorMessage="Suas senhas não conferem!"
                    validate={{ match: { value: "senha" } }}
                  />
                </AvForm>
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
        </Card>
       </div>
    );
  }
}

export default Register;
