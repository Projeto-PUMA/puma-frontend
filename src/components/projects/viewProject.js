import React, { Component } from 'react';
import * as jwt_decode from "jwt-decode";
import axios from 'axios';
import * as Store from '../../store';
import {Card, CardBody} from 'reactstrap';
import {browserHistory} from 'react-router';


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
    axios.get(path + '/sec/project/listById/' + this.props.location.state.id)
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
		project.projectArea = response.data.projectArea.description;
		project.projectStatus = response.data.projectStatus.id;
		project.answer = response.data.answer;
		author.name = response.data.author.name;
		this.setState({project, author});
	}

	renderStatus(status, id) {
		if (status === 1) {;
			return <div style={{ textAlign:"center"}}><h1 style={{ fontSize:28, color:'gray' , textAlign:"center"}}>Status: Pendente</h1><button onClick={() => this.viewProjectToEdit(id)}>Editar Projeto</button></div>;
		} else if (status === 2) {
			return <h1 style={{ fontSize:28, color:'red' , textAlign:"center"}}>Status: Rejeitado</h1>;
		} else if (status === 3) {
			return <h1 style={{ fontSize:28, color:'green' , textAlign:"center"}}>Status: Aceito</h1>;
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
				document.getElementById("status").innerHTML = "<p>Status: Aceito</p>";
        document.getElementById("answerShow").innerHTML = "Resposta: " + answer;
        document.getElementById("judge").style.display = "none";
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
				document.getElementById("status").innerHTML = "<p>Status: Rejeitado</p>";
        document.getElementById("answerShow").innerHTML = "Resposta: " + answer;
        document.getElementById("judge").style.display = "none";
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
			<div id="judge" style={{ textAlign:"center"}}>
				<button style={{ margin: 3}} onClick={() => this.acceptProject(id)}>Aceitar</button>
				<button style={{ margin: 3}} onClick={() => this.rejectProject(id)}>Rejeitar</button>
				<br></br>
				<label for="answer" style={{display:"inline-block", verticalAlign: "center"}}>
					Resposta: 	
				</label>
					<textarea style={{verticalAlign: "middle", margin: 5, width: "500px", height: "150px"}} type='text' id="answer" required/>
			</div>
		);
	}

	viewProjectToEdit(id) {
		browserHistory.push({
		  pathname: '/projeto/editar',
		  state: {
			id: id,
		  },
		});
		}
		
	render() {
		return (
			<div style={{margin:50}}>
			<Card style={{margin:100}}>
				<CardBody>
					<li style={{fontSize:"20px", fontWeight: "bold", marginLeft: 5}}>Título do Projeto: </li><p style={{marginLeft: 33, marginTop: 8}}>{this.state.project.title}</p>
					<li style={{fontSize:"20px", fontWeight: "bold", margin: 5}}>Objetivo: </li> <p style={{marginLeft: 33, marginTop: 8}}>{this.state.project.body}</p>
					<li style={{fontSize:"20px", fontWeight: "bold", margin: 5}}>Problema a ser resolvido: </li> <p style={{marginLeft: 33, marginTop: 8}}>{this.state.project.summary}</p>
					<li style={{fontSize:"20px", fontWeight: "bold", margin: 5}} id="area">Área: </li> <p style={{marginLeft: 33, marginTop: 8}}>{this.state.project.projectArea}</p>
					<li style={{fontSize:"20px", fontWeight: "bold", margin: 5}}>Autor: </li> <p style={{marginLeft: 33, marginTop: 8}}>{this.state.author.name}</p>
					<li style={{fontSize:"20px", fontWeight: "bold", margin: 5}} id="answerShow">Resposta: </li> <p style={{marginLeft: 33, marginTop: 8}}>{this.state.project.answer}</p>
					<div id="status">{this.renderStatus(this.state.project.projectStatus, this.state.project.id)}</div>
					{this.judgeable(this.state.project.projectStatus) ? this.renderJudge(this.state.project.id) : null}
				</CardBody>
			</Card>
			</div>
		);
	}
}

export default ViewProject;
