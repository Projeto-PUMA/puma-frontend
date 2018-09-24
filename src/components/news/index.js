import React, { Component } from 'react';
import axios from 'axios';
import * as jwt_decode from "jwt-decode";
import * as Store from '../../store';
import './style.css';

class News extends Component {

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

    const path = Store['backend'].path; // This is backend path
    axios.get(path + '/sec/post/listAll')
			.then(response => { this.setNews(response) })
			.catch(() => { alert('Erro ao processar notícias!') });
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

	deleteNews(id, idx) {
		var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser && currentUser.token;
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

    const path = Store['backend'].path; // This is backend path
    axios.delete(path + '/sec/post/delete/' + id)
			.then(() => {
				document.getElementById("newsTable").deleteRow(idx);
				alert('Notícia deletada com sucesso!');
			})
			.catch(() => { alert('Erro ao deletar notícia!') });
	}

	renderTableLine(d, idx) {
		return (<tr key={idx}><td>{d.title}</td><td>{d.body}</td><td><i className="fas fa-trash" onClick={() => {this.deleteNews(d.id, idx)}}></i></td></tr>);
	}

  render() {
		const data = this.state.news;
    return (
			<div>
				<table id="newsTable">
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

export default News;
