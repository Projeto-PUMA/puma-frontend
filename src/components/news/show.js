import React, { Component } from 'react';
import axios from 'axios';
import * as Store from '../../store';

class ViewNews extends Component {

  constructor(props) {
    super(props);
    this.state = {news: { body: '', title: '' }, author: {}};
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
    axios.get(path + '/sec/post/listById/' + this.props.location.state.id)
			.then(response => { this.setNews(response.data) })
			.catch(() => { alert('Erro ao processar noticia!') });
  }

  setNews(response) {
		let news = Object.assign({}, this.state.news);
		let author = Object.assign({}, this.state.author);
		news.id = response.id;
		news.title = response.title;
		news.body = response.body;
		author.name = response.author.name;
		this.setState({news, author});
	}
  
	render() {
		return (
			<div style={{ margin: 50, marginTop: 120 }}>
				<h2>{this.state.news.title}</h2>
        <div style={{ marginTop: 30 }} dangerouslySetInnerHTML={{ __html: this.state.news.body }} />
			</div>
		);
	}
}

export default ViewNews;
