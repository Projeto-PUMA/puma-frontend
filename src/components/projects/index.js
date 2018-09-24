import React, { Component } from 'react';
import axios from 'axios';
import * as jwt_decode from "jwt-decode";
import ReactDOM from 'react-dom';
import * as Store from '../../store';
import ViewProject from './viewProject';

class Projects extends Component {

	constructor(props) {
		super(props);
		this.state = {projects: []};
  }
  
  viewProject(id) {
    ReactDOM.render(
      <ViewProject
        id={id}
      />,
      document.getElementById('center')
    );
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
    axios.get(path + '/sec/project/listAll')
			.then(response => { this.setProjects(response) })
			.catch(() => { alert('Erro ao processar notícias!') });
	}

	setProjects(response) {
		for(var i=0; i<response.data.length; i++) {
			this.setState({ 
				projects: this.state.projects.concat(response.data[i])
			})
		}
	}

	getDecodedAccessToken(token) {
    try {
      return jwt_decode(token);
    }
    catch(Error){
      return null;
    }
	}

	deleteProject(id, idx) {
		var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser && currentUser.token;
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

    const path = Store['backend'].path; // This is backend path
    axios.delete(path + '/sec/project/delete/' + id)
			.then(() => {
				document.getElementById("projectsTable").deleteRow(idx+1);
				alert('Projeto deletado com sucesso!');
			})
			.catch(() => { alert('Erro ao deletar Projeto!') });
	}

	renderTableLine(d, idx) {
		return (<tr key={idx} onClick={() => this.viewProject(d.id)}><td>{d.title}</td><td>{d.body}</td><td><i className="fas fa-trash" onClick={() => {this.deleteProject(d.id, idx)}}></i></td></tr>);
	}

  render() {
		const data = this.state.projects;
    return (
			<div>
				<table id="projectsTable">
					<thead>
						<tr>
							<th>Título</th>
							<th>Descrição</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{data.map((d, idx) => this.renderTableLine(d, idx))}
					</tbody>
				</table>
			</div>
    );
  }
}

export default Projects;
