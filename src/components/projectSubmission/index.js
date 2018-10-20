import React, { Component } from 'react';
import axios from 'axios';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import * as Store from '../../store';
import * as jwt_decode from "jwt-decode";
import {Card, CardBody, Form, Label, Input,Row,Col,Button, FormGroup} from 'reactstrap';

class ProjectSubmission extends Component {

	constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleProject = this.handleProject.bind(this);
  }
  
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
    .then(() => { alert('Projeto cadastrado com sucesso!') })
    .catch(function (error) {
      if (error) {
        alert('Projeto não cadastrado!');
      }
    });
	}
	
  render() {
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
                {/* <Editor
                  ref='body'
                  name='body'
                  id='body'
                  // editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  // onEditorStateChange={this.onEditorStateChange}
                /> */}
              </FormGroup>
              <FormGroup>
                 <Label for='area'>Área de Aplicação *</Label>
                 <Input
                 ref='area'
                 type='select'
                 name='area'
                 id='area'
                 value={this.state.value}
                 onChange={this.handleChange}
                 >            
                 <option ref="0">Selecionar Área</option>
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
              <FormGroup tag="fieldset" required>
                <legend>Tipo de Submissão *</legend>
                <FormGroup check>
                  <Label check for='type'>
                    <Input type="radio"  name='type' id='type' value='pf'/>{'Pessoa Física'}
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio"  name='type' id='type' value='pj'/>{'Pessoa Jurídica'}
                  </Label>
                </FormGroup>
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
