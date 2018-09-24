import React, { Component } from 'react';
import axios from 'axios';
import * as jwt_decode from "jwt-decode";
import * as Store from '../../store';
import './style.css';

class MyProjects extends Component {

	constructor(props) {
		super(props);
		this.state = {news: new Array()};
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
		let tokenInfo = this.getDecodedAccessToken(token);

		const path = Store['backend'].path; // This is backend path
		axios.get(path + '/sec/project/listByAuthorId/' + tokenInfo.id)
						.then(response => { this.setNews(response) })
						.catch(() => { alert('Erro ao processar projetos!') });
	}

	setNews(response) {
		for(var i=0; i<response.data.length; i++) {
			this.setState({ 
				news: this.state.news.concat(response.data[i])
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
		if (statusCode==1) {
			return <td bgcolor="#FAFAE6">Pendente</td>;
		} else if (statusCode==2) {
			return <td bgcolor="#90EE90">Aceito</td>;
		} else if (statusCode==3) {
			return <td bgcolor="#FF6961">Rejeitado</td>;
		}
	}

	renderTableLine(d, idx) {
		return (<tr key={idx}><td>{d.title}</td><td>{d.body}</td>{this.renderStatus(d.projectStatus)}</tr>);
	}

  render() {
		const data = this.state.news;
    return (
			<div>
				<table>
					<thead>
						<tr>
							<th>Título</th>
							<th>Descrição</th>
							<th>Status</th>
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

export default MyProjects;
