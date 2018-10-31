import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import axios from 'axios';
import * as jwt_decode from "jwt-decode";
import * as Store from '../../store';
import {Col,Row,Input,Label,Button,FormGroup,Card,CardBody,Form} from 'reactstrap';
import { Editor } from 'react-draft-wysiwyg';
import {browserHistory} from 'react-router';

class NewsSubmission extends Component {

	constructor(props) {
    super(props);
    this.handleNews = this.handleNews.bind(this);
  }

  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

	getDecodedAccessToken(token) {
    try {
      return jwt_decode(token);
    }
    catch(Error){
      return null;
    }
	}
	
	handleNews(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    const { editorState } = this.state;

		var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser && currentUser.token;
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
    let tokenInfo = this.getDecodedAccessToken(token);

    const path = Store['backend'].path; // This is backend path
    axios.post(path + '/sec/post/new', {
      author: { id: tokenInfo.id },
			title: data.get('title'),
			body: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    })
    .then(() => 
      { alert('Notícia criada com sucesso!'); 
        browserHistory.push('/gerenciarnoticias');})
    .catch(function (error) {
      if (error) {
        alert('Notícia não cadastrada!');
      }
    });
  }

  render() {
    const { editorState } = this.state;
    return (
			<div>
        <Row>
          <Col sm='2' md='3' lg='4' xs='1'/>
          <Col sm='6' md='5' lg='4' xs='10' style={{textAlign:'center'}}><h2>Submissão de Notícia</h2></Col>
          </Row>
        <Row>
          <Col sm='1' md='2' lg='3' xs='1'/>
          <Col sm='8' md='7' lg='6' xs='10'>
          <Card>
          <CardBody>
          <Form
            id='projectSubmissionForm'
            name='projectSubmissionForm'
            onSubmit={this.handleNews}
          >
            <FormGroup>
              <Label >Título da Notícia *</Label>
              <Input
                ref='title'
                type='text'
                name='title'
                id='title'
                required/>
            </FormGroup>
            <FormGroup>
              <Label>Conteúdo/Corpo *</Label>
              <Editor
                editorState={editorState}
                ref='body'
                type='textarea'
                name='body'
                id='body'
                onEditorStateChange={this.onEditorStateChange}
                required
              />
            </FormGroup>
            <br></br>
            <Button type="submit" value ="submit" color="primary" style={{ display: "block",margin: "0 auto"}}>
              Enviar Notícia
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

export default NewsSubmission;
