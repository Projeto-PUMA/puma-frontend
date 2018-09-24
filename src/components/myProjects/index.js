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
		
	getDecodedAccessToken(token) {
		try {
			return jwt_decode(token);
		}
		catch(Error){
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

	renderTableLine(d, idx) {
		return (<tr key={idx}><td>{d.title}</td><td>{d.body}</td></tr>);
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
