import React, { Component } from 'react';
import axios from 'axios';
import * as Store from '../../store';
import CarouselApp from '../carousel/index.js';
import {
  Card, CardText, CardBody, CardLink,
  CardTitle,
} from 'reactstrap';
import { browserHistory } from 'react-router';

class Grid extends Component {

  constructor(props) {
		super(props);
		this.state = {news: []};
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

  viewNews(id) {
    browserHistory.push({
      pathname: '/noticia',
      state: {
        id: id,
      },
    });
  }
  
  renderCard(d, idx) {
    if (idx > 2) return;
    return (
      <div key={idx}>
        <Card onClick={() => this.viewNews(d.id)} style={{ margin: 10, marginBottom: 20 }}>
          <CardBody>
            <CardTitle>{d.title}</CardTitle>
          </CardBody>
          <CardBody>
            <CardText>{ /*d.body.substring(0, 40)*/ 'Um sumário da notícia ficará aqui'}</CardText>
            <CardLink style={{ color: 'blue' }}>Ler mais...</CardLink>
          </CardBody>
        </Card>
      </div>
    );
  }

  render() {
    const data = this.state.news;
    return (
      <div id='content' style={{ width: '100%', height: '100%' }}>
        <div style={{ marginTop: 40, width: '100%', align: 'center', marginBottom: 20 }}>
          <CarouselApp />
        </div>
        <div style={{ flexDirection: 'row' }}>
          <div style={{ minWidth: '30%', maxWidth: '30%', float: 'left' }}>
            <h2 style={{ marginLeft: 10 }}>Notícias</h2>
            {data.map((d, idx) => this.renderCard(d, idx))}
          </div>
          <div style={{ minWidth: '30%', maxWidth: '30%', float: 'left', right: 0 }}>
            <h2 style={{ marginLeft: 10 }}>Projetos</h2>
            <Card style={{ margin: 10, marginBottom: 20 }}>
              <CardBody>
                <CardTitle>{'Projeto 1'}</CardTitle>
              </CardBody>
              <CardBody>
                <CardText>{'Descrição do Projeto 1'}</CardText>
                <CardLink href="#">Ler mais...</CardLink>
              </CardBody>
            </Card>
            <Card style={{ margin: 10, marginBottom: 20 }}>
              <CardBody>
                <CardTitle>{'Projeto 2'}</CardTitle>
              </CardBody>
              <CardBody>
                <CardText>{'Descrição do Projeto 2'}</CardText>
                <CardLink href="#">Ler mais...</CardLink>
              </CardBody>
            </Card>
            <Card style={{ margin: 10, marginBottom: 20 }}>
              <CardBody>
                <CardTitle>{'Projeto 3'}</CardTitle>
              </CardBody>
              <CardBody>
                <CardText>{'Descrição do Projeto 3'}</CardText>
                <CardLink href="#">Ler mais...</CardLink>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Grid;
