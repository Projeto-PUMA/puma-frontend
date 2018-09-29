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
          <Col sm='2' md='3' lg='4' xs='1'/>
          <Col sm='6' md='5' lg='4' xs='10'>
          <Card>
            <CardBody>
              <Form
              id='projectSubmissionForm'
              name='projectSubmissionForm'
              onSubmit={this.handleProject}
              >
              <FormGroup>
                 <Label>Título do Projeto *</Label>
                 <Input
                 ref='title'
                 type='text'
                 name='title'
                 id='title'  
                 required              
                 />
              </FormGroup>
              <FormGroup>
                 <Label>Resumo *</Label>
                 <Input 
                 ref='summary'
                 type='textarea'
                 name='summary'
                 id='summary'
                 required
                 />
              </FormGroup>
              <FormGroup>
                 <Label>Problemática *</Label>
                 <Editor
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
                 <option ref="1"value={"PSP1"}>PSP1 - Probabilidade e Estatística</option>
                 <option ref="2"value={"PSP2"}>PSP2 - Sistemas de Informação</option>
                 <option ref="3"value={"PSP3"}>PSP3 - Livre</option>
                 <option ref="4"value={"PSP4"}>PSP4 - Planejamento e Controle da Produção</option>
                 <option ref="5"value={"PSP5"}>PSP5 - Gestão da Qualidade</option>
                 <option ref="6"value={"PSP6"}>PSP6 - Engenharia do Produto</option>
                 <option ref="7"value={"PSP7"}>PSP7 - Gestão Estratégica</option>
                 <option ref="8"value={"UNDEF"}>Não sei em qual categoria meu projeto se encaixa</option>
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
          </Card>
          </Col>

        </Row>

      </div>
    );
  }
}

export default ProjectSubmission;
