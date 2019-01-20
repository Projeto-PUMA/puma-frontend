import React, { Component } from 'react';
import axios from 'axios';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import * as Store from '../../store';
import * as jwt_decode from "jwt-decode";
import {Card, CardBody, Form, Label, Input,Row,Col,Button, FormGroup} from 'reactstrap';
import {browserHistory} from 'react-router';
import MaskedInput from 'react-text-mask'

class ProjectSubmission extends Component {

	constructor(props) {
    super(props);
    this.state = {value: '', showJuridic: false};

    this.handleChange = this.handleChange.bind(this);
    this.handleProject = this.handleProject.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
  }

  cepmask  = [/\d/, /\d/, /\d/, /\d/, /\d/, '-' , /\d/, /\d/, /\d/];
  cnpjmask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  
  getDecodedAccessToken(token) {
    try {
      return jwt_decode(token);
    }
    catch(Error){
      return null;
    }
  }
  handleChange(event){
    this.setState({value: event.target.value});
  }
	
	handleProject(e) {
    e.preventDefault();

    var data = new FormData(e.target);

		var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser && currentUser.token;
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
    let tokenInfo = this.getDecodedAccessToken(token);

    const path = Store['backend'].path;
    axios.post(path + '/sec/project/new', {
      title: data.get('title'),
			summary: data.get('summary'),
			body: data.get('body'),//document.getElementById('body'),
			author: { id: tokenInfo.id },
			projectAuthorCategory: {id:1},//document.getElementById('type').value,  //// 1 to PF, 2 to PJ
			cnpj: null, // have a PJ?
			projectStatus: { id: 1 }, // Initial status to project
			answer: null, // Response from coord
      projectArea: { id: 1 },//data.get('area'),//data.get('area'), // this is a dropdown
      projectSubArea: { id: 1 }, // this is a dropdown
			projectAreaDescription: { id: 1 }, // this is ??
    })
    .then(() => 
      { alert('Projeto cadastrado com sucesso!') 
          browserHistory.push('/meusprojetos');
      })
    .catch(function (error) {
      if (error) {
        alert('Projeto não cadastrado!');
      }
    });
  }

  renderJuridic() {
    if (this.state.showJuridic) {
      return (
        <div>
          <FormGroup>
            <Label>Nome da Empresa *</Label>
            <Input
              ref='title'
              type='text'
              name='companyName'
              id='companyName'
              maxLength="200"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Razão Social *</Label>
            <Input
              ref='title'
              type='text'
              name='corporateName'
              id='corporateName'
              maxLength="200"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>CNPJ</Label>
            <Input
              ref='title'
              type='text'
              name='CNPJ'
              id='CNPJ'
              mask={this.cnpjmask}
              tag={MaskedInput}
              required
            />
          </FormGroup>
          <Row>
          <Col xs="auto">
          <FormGroup>
            <Label>Endereço *</Label>
            <Input
              ref='title'
              type='text'
              name='address'
              id='address'
              maxLength="200"
              style={{width: '38vw'}}
              required
            />
          </FormGroup>
          </Col>
          <Col xs="auto">
          <FormGroup>
            <Label>Número *</Label>
            <Input
              ref='title'
              type='number'
              name='number'
              id='number'
              maxLength="4"
              style={{width: '55px'}}
              required
            />
          </FormGroup>
          </Col>
          </Row>
          <Row>
          <Col xs="auto">
          <FormGroup>
            <Label>País *</Label>
            <Input
              ref='title'
              type='select'
              name='country'
              id='country'
              maxLength="50"
              style={{width: '140px'}}
              required
            >
              <option ref="1" value={"brasil"} className="optionGroup">Brasil</option>
              <option ref="2" value={"outros"} className="optionGroup">Outros</option>
            </Input>
          </FormGroup>
          </Col>
          <Col xs="auto">
          <FormGroup>
            <Label>Estado *</Label>
            <Input
              ref='title'
              type='select'
              name='state'
              id='state'
              maxLength="50"
              style={{width: '300px'}}
              required
            >
              <option ref="1" value={"AC"} className="optionGroup">Acre - AC</option>
              <option ref="2" value={"AL"} className="optionGroup">Alagoas - AL</option>
              <option ref="3" value={"AP"} className="optionGroup">Amapá - AP</option>
              <option ref="4" value={"AM"} className="optionGroup">Amazonas - AM</option>
              <option ref="5" value={"BA"} className="optionGroup">Bahia - BA</option>
              <option ref="6" value={"CE"} className="optionGroup">Ceará - CE</option>
              <option ref="7" value={"DF"} className="optionGroup">Distrito Federal - DF</option>
              <option ref="8" value={"ES"} className="optionGroup">Espirito Santo - ES</option>
              <option ref="9" value={"GO"} className="optionGroup">Goiás - GO</option>
              <option ref="10" value={"MA"} className="optionGroup">Maranhão - MA</option>
              <option ref="11" value={"MT"} className="optionGroup">Mato Grosso - MT</option>
              <option ref="12" value={"MS"} className="optionGroup">Mato Grosso do Sul - MS</option>
              <option ref="13" value={"MG"} className="optionGroup">Minas Gerais - MG</option>
              <option ref="14" value={"PA"} className="optionGroup">Pará - PA</option>
              <option ref="15" value={"PB"} className="optionGroup">Paraíba - PB</option>
              <option ref="16" value={"PR"} className="optionGroup">Paraná - PR</option>
              <option ref="17" value={"PE"} className="optionGroup">Pernambuco - PE</option>
              <option ref="18" value={"PI"} className="optionGroup">Piauí - PI</option>
              <option ref="19" value={"RJ"} className="optionGroup">Rio de Janeiro - RJ</option>
              <option ref="20" value={"RN"} className="optionGroup">Rio Grande do Norte - RN</option>
              <option ref="21" value={"RS"} className="optionGroup">Rio Grande do Sul - RS</option>
              <option ref="22" value={"RO"} className="optionGroup">Rondônia - RO</option>
              <option ref="23" value={"RR"} className="optionGroup">Roraima - RR</option>
              <option ref="24" value={"SC"} className="optionGroup">Santa Catarina - SC</option>
              <option ref="25" value={"SP"} className="optionGroup">São Paulo - SP</option>
              <option ref="26" value={"SE"} className="optionGroup">Sergipe - SE</option>
              <option ref="27" value={"TO"} className="optionGroup">Tocantins - TO</option>
            </Input>
          </FormGroup>
          </Col>
          <Col xs="auto">
          <FormGroup>
            <Label>CEP *</Label>
            <Input
              ref='title'
              type='text'
              name='cep'
              id='cep'
              style={{width: '140px'}}
              mask={this.cepmask}
              tag={MaskedInput}
              required
            />
          </FormGroup>
          </Col>
          </Row>
        </div>
      )
    }
  }
  
  handleRadio(event) {
    const showJuridic = event.currentTarget.value === 'pj' ? true: false;
    console.log('handle', showJuridic);
    this.setState({ showJuridic });
  }
  
  render() {
    const { showJuridic } = this.state;
    let juridic;

    if (this.state.showJuridic) {
      juridic = this.renderJuridic();
    }

    return (
      <div>
        <Row>
        <Col sm='2' md='3' lg='4' xs='1'/>
        <Col sm='6' md='5' lg='4' xs='10' style={{textAlign:'center'}}><h2>Submissão de Projeto</h2></Col>
        </Row>
        <Row>
          <Col sm='1' md='2' lg='3' xs='1'/>
          <Col sm='8' md='7' lg='6' xs='10'>
          <Card>
            <CardBody>
              <Form
              id='projectSubmissionForm'
              name='projectSubmissionForm'
              onSubmit={this.handleProject}
              >
              <FormGroup>
                 <Label>Qual o título do projeto? *</Label>
                 <Input
                 ref='title'
                 type='text'
                 name='title'
                 id='title'
                 maxLength="100"  
                 required              
                 />
              </FormGroup>
              <FormGroup>
                 <Label>Qual problema deseja resolver neste projeto? *</Label>
                 <Input 
                 ref='summary'
                 type='textarea'
                 name='summary'
                 id='summary'
                 required
                 />
              </FormGroup>
              <FormGroup>
                 <Label>Qual objetivo você quer alcançar com este projeto? *</Label>
                 <Input
                 ref='body'
                 type='textarea'
                 name='body'
                 id='body'
                 required
                 />
              </FormGroup>
              <FormGroup>
                 <Label for='area'>Área de Aplicação *</Label>
                 <Input
                 ref='area'
                 type='select'
                 name='area'
                 id='area'
                 required
                 value={this.state.value}
                 onChange={this.handleChange}
                 >            
                 <option ref="0" disabled selected>Selecionar Área</option>
                 <option ref="1" value={"PSP1"} className="optionGroup" disabled>PSP1 - Probabilidade e Estatística</option>
                  <option ref="1.1"value={"PSP1-ABD"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Análise de Banco de Dados</option>
                  <option ref="1.2"value={"PSP1-CQP"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Criação de Questionários de Pesquisa</option>
                  <option ref="1.3"value={"PSP1-OTHERS"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Outras</option>
                 <option ref="2"value={"PSP2"} className="optionGroup" disabled>PSP2 - Sistemas de Informação</option>
                   <option ref="2.1"value={"PSP2-PSI"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Projeto de Sistemas de Informação</option>
                   <option ref="2.2"value={"PSP2-OTHERS"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Outras</option>
                 <option ref="3"value={"PSP3"} className="optionGroup" disabled>PSP3 - Livre</option>
                    <option ref="3.1"value={"PSP3-OTHERS"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Outras</option>
                 <option ref="4"value={"PSP4"} className="optionGroup" disabled>PSP4 - Planejamento e Controle da Produção</option>
                   <option ref="4.1"value={"PSP4-PDD"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Previsão de Demanda</option>
                   <option ref="4.2"value={"PSP4-GDE"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gestão de Estoques</option>
                   <option ref="4.3"value={"PSP4-CFA"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Criação de Ferramentas de Apoio ao Planejamento e Controle da Produção</option>
                   <option ref="4.4"value={"PSP4-OTHERS"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Outras</option>
                 <option ref="5"value={"PSP5"} className="optionGroup" disabled>PSP5 - Gestão da Qualidade</option>
                   <option ref="5.1"value={"PSP5-MDP"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mapeamento de Processos</option>
                   <option ref="5.2"value={"PSP5-CDV"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cadeia de Valor</option>
                   <option ref="5.3"value={"PSP5-MCP"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Melhoria Contínua de Processos</option>
                   <option ref="5.4"value={"PSP5-OTHERS"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Outras</option>
                 <option ref="6"value={"PSP6"} className="optionGroup" disabled>PSP6 - Engenharia do Produto</option>
                   <option ref="6.1"value={"PSP6-EPC"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Elaboração de Projeto Conceitual de Produto</option>
                   <option ref="6.2"value={"PSP6-OTHERS"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Outras</option>
                 <option ref="7"value={"PSP7"} className="optionGroup" disabled>PSP7 - Gestão Estratégica</option>
                   <option ref="7.1"value={"PSP7-DOE"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Definição de Objetivos Estratégicos</option>
                   <option ref="7.2"value={"PSP7-VBE"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Viabilidade Econômica</option>
                   <option ref="7.3"value={"PSP7-DDM"} className="optionChild">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Desdobramento de Metas</option>
                 <option ref="8"value={"UNDEF"} className="optionGroup">Não sei em qual categoria meu projeto se encaixa</option>
                 </Input>
              </FormGroup>
              <FormGroup>
                 <Label>Link do PDF *</Label>
                 <Input
                 ref='title'
                 type='text'
                 name='title'
                 id='title'
                 maxLength="500"  
                //  required              
                 />
              </FormGroup>
              <FormGroup tag="fieldset" required>
                <legend>Tipo de Submissão *</legend>
                <FormGroup check>
                  <Label check for='type'>
                    <Input type="radio"  name='type' id='type' value='pf' checked={showJuridic === false} onChange={this.handleRadio}/>{'Pessoa Física'}
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio"  name='type' id='type' value='pj' checked={showJuridic === true} onChange={this.handleRadio}/>{'Pessoa Jurídica'}
                  </Label>
                </FormGroup>
                <br/>
                {juridic}
              </FormGroup>
                <Button type="submit" value ="submit" color="primary" style={{ display: "block",margin: "0 auto"}}>
                 Enviar Projeto
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

export default ProjectSubmission;
