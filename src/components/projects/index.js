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

	renderStatus(statusCode) {
		if (statusCode===1) {
			return <i style={{color: 'black'}} class="fas fa-ellipsis-h"></i>;
		} else if (statusCode===2) {
			return <i style={{color: 'red'}} class="fas fa-ban"></i>;
		} else if (statusCode===3) {
			return <i style={{color: 'green'}} class="fas fa-check"></i>;
		}
	}

	renderTableLine(d, idx) {
		return (<tr key={idx}><td>{d.title}</td><td>{d.body}</td><td>{this.renderStatus(d.projectStatus.id)}</td><td><i className="fas fa-eye" onClick={() => this.viewProject(d.id)}></i></td></tr>);
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
							<th>Status</th>
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
