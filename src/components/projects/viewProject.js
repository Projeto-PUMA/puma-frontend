import React, { Component } from 'react';
import * as jwt_decode from "jwt-decode";
import axios from 'axios';
import * as Store from '../../store';

class ViewProject extends Component {

	constructor(props) {
    super(props);
		this.state = {project: {}, author: {}};
	}

	getDecodedAccessToken(token) {
		try {
				return jwt_decode(token);
		}
		catch (Error) {
				return null;
		}
	}

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
    axios.get(path + '/sec/project/listById/' + this.props.params.id)
			.then(response => { this.setProject(response) })
			.catch(() => { alert('Erro ao processar projeto!') });
	}

	setProject(response) {
		let project = Object.assign({}, this.state.project);
		let author = Object.assign({}, this.state.author);
		project.id = response.data.id;
		project.title = response.data.title;
		project.body = response.data.body;
		project.summary = response.data.summary;
		project.projectStatus = response.data.projectStatus.id;
		project.answer = response.data.answer;
		author.name = response.data.author.name;
		this.setState({project, author});
	}

	renderStatus(status) {
		if (status === 1) {
			return <h1>Status: Pendente</h1>;
		} else if (status === 2) {
			return <h1>Status: Rejeitado</h1>;
		} else if (status === 3) {
			return <h1>Status: Aceito</h1>;
		}
	}

	acceptProject(id) {
		const answer = document.getElementById("answer").value;

		var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser && currentUser.token;
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

    const path = Store['backend'].path; // This is backend path
    axios.put(path + '/sec/project/update/' + id, {
			answer: answer,
      projectStatus: {id: 3},
    })
			.then(() => {
				document.getElementById("status").innerHTML = "<h1>Status: Aceito</h1>";
				document.getElementById("answerShow").innerHTML = "Answer: " + answer;
				alert('Projeto aceito com sucesso!');
			})
			.catch(() => { alert('Erro ao aceitar o Projeto!') });
	}

	rejectProject(id) {
		const answer = document.getElementById("answer").value;

		var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser && currentUser.token;
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

    const path = Store['backend'].path; // This is backend path
    axios.put(path + '/sec/project/update/' + id, {
			answer: answer,
      projectStatus: {id: 2},
    })
			.then(() => {
				document.getElementById("status").innerHTML = "<h1>Status: Rejeitado</h1>";
				document.getElementById("answerShow").innerHTML = "Answer: " + answer;
				alert('Projeto rejeitado com sucesso!');
			})
			.catch(() => { alert('Erro ao rejeitar o Projeto!') });
	}

	judgeable(statusCode) {
		var admin = false;
		var role = JSON.parse(localStorage.getItem('authorities'));
		if(role) {
			for(var i=0; i<role.length; i++) {
				if(role[i].authority.includes("ADMIN")) {
					admin = true;
				}
			}
		}
		if(admin) {
			if(statusCode===1) {
				return true;
			} else {
				return false;
			}
		}
	}

	renderJudge(id) {
		return (
			<div>
				<button onClick={() => this.acceptProject(id)}>Aceitar</button>
				<button onClick={() => this.rejectProject(id)}>Rejeitar</button>
				<label>
					Resposta:
					<input type='text' id="answer"/>
				</label>
			</div>
		);
	}

	render() {
		return (
			<div style={{margin:50}}>
				<h3>Title: {this.state.project.title}</h3>
				<h3>Body: {this.state.project.body}</h3>
				<h3>Summary: {this.state.project.summary}</h3>
				<h3>Author: {this.state.author.name}</h3>
				<h3 id="answerShow">Answer: {this.state.project.answer}</h3>
				<div id="status">{this.renderStatus(this.state.project.projectStatus)}</div>
				{this.judgeable(this.state.project.projectStatus) ? this.renderJudge(this.state.project.id) : null}
			</div>
		);
	}
}

export default ViewProject;
