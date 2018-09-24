import React, { Component } from 'react';
import axios from 'axios';
import * as jwt_decode from "jwt-decode";
import * as Store from '../../store';

class NewsSubmission extends Component {

	constructor(props) {
    super(props);
    this.handleNews = this.handleNews.bind(this);
  }

	getDecodedAccessToken(token) {
    try {
      return jwt_decode(token);
    }
    catch(Error){
      return null;
    }
	}
	
	handleNews(e) {
    e.preventDefault();

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
    axios.post(path + '/sec/post/new', {
      author: { id: tokenInfo.id },
			title: data['title'],
			body: data['body']
    })
    .then(() => { alert('Notícia criada com sucesso!') })
    .catch(function (error) {
      if (error) {
        alert('Notícia não cadastrada!');
      }
    });
  }

  render() {
    return (
			<div>
				<form onSubmit={this.handleNews}>
					<label>
						Título da Notícia:
						<input ref="title" className="title" type='text' name="title"/>
					</label>
					<label>
						Descrição:
						<input ref="body" className="body" type='text' name="body"/>
					</label>
					<input type="submit" value="Submit"/>
				</form>
      </div>
    );
  }
}

export default NewsSubmission;
