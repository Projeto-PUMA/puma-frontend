import React, { Component } from 'react';
import axios from 'axios';
import * as Store from '../../store';
import {Input,Label,Button,FormGroup, Form} from 'reactstrap';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {browserHistory} from 'react-router';
import * as jwt_decode from "jwt-decode";

class UpdateNews extends Component {

  constructor(props) {
    super(props);
    this.state = {news: { body: '', title: '' }, author: {}};
  }

  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  
  componentWillMount() {
    const data = {};
    
    for (const field in this.refs) {
      data[field] = this.refs[field].value;
		}
		
		var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser && currentUser.token;
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

    const path = Store['backend'].path; // This is backend path
    axios.get(path + '/sec/post/listById/' + this.props.location.state.id)
			.then(response => { this.setNews(response.data) })
            .catch(() => { alert('Erro ao processar noticia!') });
  }

  getDecodedAccessToken(token) {
    try {
      return jwt_decode(token);
    }
    catch(Error){
      return null;
    }
	}

	handleNews=(e) => {
        e.preventDefault();
    
        const data = new FormData(e.target);
        const { editorState } = this.state;
    
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var token = currentUser && currentUser.token;
        axios.defaults.headers.common['Authorization'] = "Bearer " + token;
        axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
        let tokenInfo = this.getDecodedAccessToken(token);
    
        const path = Store['backend'].path; // This is backend path
        axios.put(path + '/sec/post/update/' + this.props.location.state.id, {
          author: { id: tokenInfo.id },
                title: data.get('title'),
                body: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        })
        .then(() => 
          { alert('Notícia atualizada com sucesso!'); 
            browserHistory.push('/gerenciarnoticias');})
        .catch(function (error) {
          if (error) {
            alert('Notícia não cadastrada!');
          }
        });
      }

  setNews(response) {
		let news = Object.assign({}, this.state.news);
    let author = Object.assign({}, this.state.author);
    
		news.id = response.id;
		news.title = response.title;
		news.body = response.body;
    author.name = response.author.name;
    this.setState({news, author});
    this.setState({ editorState: EditorState.createWithContent(ContentState.createFromText(news.body)) });
	}
  
	render() {
        const { editorState } = this.state;
		return (
            <div style={{ margin: 50, marginTop: 120 }}>
                <Form
                    id='updateNewsForm'
                    name='updateNewsForm'
                    onSubmit={this.handleNews}
                >
                    <FormGroup>
                        <Label >Título da Notícia *</Label>
                        <Input
                            ref='title'
                            type='text'
                            name='title'
                            id='title'
                            defaultValue={this.state.news.title}
                            />
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
                            editorStyle={{ border: '0.5px solid gainsboro', height: 300 }}
                        />
                    </FormGroup>
                    {/* <div style={{ marginTop: 30 }} dangerouslySetInnerHTML={{ __html: this.state.news.body }} /> */}
                    <Button type="submit" value="submit" color="primary" style={{ display: "block", margin: "0 auto" }}>Salvar</Button>
                    <Button value="cancel" color="danger" onClick={() => { browserHistory.push('/gerenciarnoticias')}} style={{ display: "block", margin: "0 auto", marginTop: "10px" }}>Cancelar</Button>

                </Form>
            </div>
		);
	}
}

export default UpdateNews;
