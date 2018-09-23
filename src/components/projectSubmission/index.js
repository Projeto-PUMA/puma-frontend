import React, { Component } from 'react';
import axios from 'axios';
import * as Store from '../../store';
import * as jwt_decode from "jwt-decode";

class ProjectSubmission extends Component {

	constructor(props) {
    super(props);
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
	
	handleProject(e) {
    e.preventDefault();

    const data = {};
    for (const field in this.refs) {
      data[field] = this.refs[field].value;
		}

		var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser && currentUser.token;
    axios.defaults.headers.common['Authorization'] = "Bearer " + token,
    axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
    let tokenInfo = this.getDecodedAccessToken(token);

    const path = Store['backend'].path;
    axios.post(path + '/sec/project/new', {
      title: data['title'],
			summary: data['summary'],
			body: data['body'],
			author: { id: tokenInfo.id },
			projectAuthorCategory: { id: 1 }, // 1 to PF, 2 to PJ
			cnpj: null, // have a PJ?
			projectStatus: { id: 1 }, // Initial status to project
			answer: null, // Response from coord
      projectArea: { id: 1 }, // this is a dropdown
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
        <form onSubmit={this.handleProject}>
          <label>
            Título do Projeto:
            <input ref="title" className="title" type='text' name="title"/>
          </label>
          <label>
            Resumo:
            <input ref="summary" className="summary" type='text' name="summary"/>
          </label>
					<label>
            Problemática:
            <input ref="body" className="body" type='text' name="body"/>
          </label>
					<label>
            Área de Aplicação:
            <input ref="area" className="area" type='text' name="area"/>
          </label>
					<label>
            Tipo de Submissão:
            <input ref="type"  className="type" type='text' name="type"/>
          </label>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default ProjectSubmission;
