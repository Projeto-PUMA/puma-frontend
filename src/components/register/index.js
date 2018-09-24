import React, { Component } from "react";
import axios from "axios";
import * as Store from "../../store";

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleSubmission = this.handleSubmission.bind(this);
  }

  handleSubmission(event) {
    event.preventDefault();
    console.log(event.target.escolaridade.value);
    const path = Store["backend"].path; // This is backend path
    axios
      .post(path + "/register", {
        name: event.target.nome.value,
        username: event.target.cpf.value,
        cep: event.target.cep.value,
        fullAddress: event.target.endereco.value,
        phonePrincipal: event.target.telefoneCel.value,
        phoneAlternative: event.target.telefoneFix.value,
        education: event.target.escolaridade.value,
        profession: event.target.profissao.value,
        password: event.target.password.value,
        email: event.target.email.value
      })
      .then(() => {
        alert("Usuário cadastrado com sucesso!");
      })
      .catch(function(error) {
        if (error) {
          alert("Erro ao cadastrar!");
        }
      });
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.handleSubmission}
          id="formSubmissao"
          name="formSubmissao"
        >
          <section>
            <label>
              Nome
              <input
                ref="title"
                type="text"
                name="nome"
                id="nome"
                className="nome"
              />
            </label>
          </section>

          <section>
            <label>
              CPF
              <input
                ref="title"
                type="text"
                name="cpf"
                id="cpf"
                className="cpf"
              />
            </label>
          </section>
          <section>
            <label>
              CEP
              <input
                ref="body"
                type="text"
                name="cep"
                id="cep"
                className="cep"
              />
            </label>
          </section>
          <section>
            <label>
              Endereço
              <input
                ref="title"
                type="text"
                name="endereco"
                id="endereco"
                className="endereco"
              />
            </label>
          </section>
          <section>
            <label>
              Telefone Celular
              <input
                ref="title"
                type="text"
                name="telefoneCel"
                id="telefoneCel"
                className="telefoneCel"
              />
            </label>
          </section>
          <section>
            <label>
              Telefone Fixo
              <input
                ref="title"
                type="text"
                name="telefoneFix"
                id="telefoneFix"
                className="telefoneFix"
              />
            </label>
          </section>
          <section>
            <label>
              E-mail
              <input
                ref="title"
                type="text"
                name="email"
                id="email"
                className="email"
              />
            </label>
          </section>
          <section>
            <label>
              Nível de Escolaridade
              <select
                ref="title"
                type="text"
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
              </select>
            </label>
          </section>
          <section>
            <label>Profissão</label>
            <input
              ref="title"
              name="profissao"
              id="profissao"
              className="profissao"
            />
          </section>
          <section>
            <label>
              Senha
              <input
                ref="title"
                type="password"
                name="password"
                className="password"
              />
            </label>
          </section>
          <section>
            <label>
              Confirme sua senha
              <input
                ref="title"
                type="passwordConf"
                name="passwordConf"
                className="passwordConf"
              />
            </label>
          </section>
          <section>
            <input type="submit" value="Submit" />
          </section>
        </form>
      </div>
    );
  }
}

export default Register;
