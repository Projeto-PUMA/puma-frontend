import React, { Component } from "react";
// eslint-disable-next-line
import axios from "axios";
// eslint-disable-next-line
import * as Store from "../../store";

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
    this.handleSubmission = this.handleSubmission.bind(this);
  }

  handleSubmission(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    console.log(data.get("nome"));
    // const path = Store["backend"].path; // This is backend path
    // axios
    //   .post(path + "/register", {
    //     name: event.target.nome.value,
    //     username: event.target.cpf.value,
    //     cep: event.target.cep.value,
    //     fullAddress: event.target.endereco.value,
    //     phonePrincipal: event.target.telefoneCel.value,
    //     phoneAlternative: event.target.telefoneFix.value,
    //     education: event.target.escolaridade.value,
    //     profession: event.target.profissao.value,
    //     password: event.target.password.value,
    //     email: event.target.email.value
    //   })
    //   .then(() => {
    //     alert("Usuário cadastrado com sucesso!");
    //   })
    //   .catch(function(error) {
    //     if (error) {
    //       alert("Erro ao cadastrar!");
    //     }
    //   });
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
              onSubmit={this.handleSubmission}
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
                  <option value="Doutor(a)  ">Doutor(a)</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label className="label">Profissão</Label>
                <Input
                  ref="title"
                  name="profissao"
                  id="profissao"
                  type="text"
                  className="input"
                />
              </FormGroup>
              <FormGroup>
                <Label className="label">Senha</Label>
                <Input
                  ref="title"
                  type="password"
                  name="password"
                  // eslint-disable-next-line
                  type="text"
                  className="input"
                />
              </FormGroup>
              <FormGroup>
                <Label className="label">Confirme sua senha</Label>
                <Input
                  ref="title"
                  type="passwordConf"
                  name="passwordConf"
                  // eslint-disable-next-line
                  type="text"
                  className="input"
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
        </Card>
      </div>
    );
  }
}

export default Register;
