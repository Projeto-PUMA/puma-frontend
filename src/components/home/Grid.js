import React, { Component } from 'react';
import axios from 'axios';
import * as Store from '../../store';
import CarouselApp from '../carousel/index.js';
import {
  Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, CardImg
} from 'reactstrap';
import { browserHistory } from 'react-router';

class Grid extends Component {

  constructor(props) {
    super(props);
    this.state = { news: [] };
  }

  componentWillMount() {
    const data = {};
    for (const field in this.refs) {
      data[field] = this.refs[field].value;
    }

    const path = Store['backend'].path; // This is backend path
    axios.get(path + '/blog/listAll')
      .then(response => { this.setNews(response) })
      .catch((error) => { console.log(error);alert('Erro ao processar notícias!') });
  }

  setNews(response) {
    for (var i = 0; i < response.data.length; i++) {
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
    var linkImage = "";
    if (idx === 0) {
      linkImage = "http://www.legacyschoolne.com/wp-content/uploads/2018/09/PBL-Header.png"
    } else if (idx === 1) {
      linkImage = "https://imgs.dm.com.br/resized/872//2018/09/Cassiano-Maschio.jpg";
    }
    return (
      <div key={idx}>
        <Card onClick={() => this.viewNews(d.id)} style={{ margin: 10, marginBottom: 20 }}>
          <CardImg top width="100%" height="240px" src={linkImage} alt="Card image cap" />
          <CardBody>
            <CardTitle>{d.title}</CardTitle>
          </CardBody>
          <CardBody>
            {/* <CardText>{ d.body.substring(0, 40) 'Originada entre o final da década de 60 e início da década de 70 em Faculdades de Medicina do Canadá e Holanda o PBL (Project/Problem Based Learning)...'}</CardText> */}
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
        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <h1>PROJETO DE SISTEMAS DE PRODUÇÃO (PSP)</h1>
          <p style={{ margin: 60, marginTop: 30, marginBottom: 0, fontWeight: 'bold', color: 'grey' }}>
            Nos cursos de Projeto de Sistemas de Produção (PSP), o principal objetivo é fazer com que os alunos apliquem os conhecimentos
            teóricos da engenharia de produção na resolução de problemas reais. Com isso, os PSPs são focados nas áreas de: Probabilidade
            e Estatística, Sistema de Informação, Planejamento e Controle da Produção, Gestão da Qualidade, Engenharia do Produto e Gestão
            Estratégica. Os estudantes trabalham em equipes e participam de todas as etapas dos projetos, desde o planejamento até o encerramento.
            Além de promover a geração de novas soluções, os PSPs proporcionam uma experiência completa de gerenciamento de projetos.
          </p>
          <img style={{ margin: 30, marginBottom: 0 }} alt="Imagem" src='http://producaounb.com.br/psp/wp-content/uploads/2017/06/new-piktochart_22996966_97374f78a6650361fd0822dc8046ce3c8857fed2-1.png' />
        </div>
        <div style={{ margin: 50, marginTop: 30, marginBottom: 30 }}>
          <Card style={{ margin: 10 }}>
            <CardBody>
              <CardTitle>{'Aberto Edital 02/2018'}</CardTitle>
              <CardSubtitle>A fim de alcançar esse objetivo global o Plano Político Pedagógico do Curso de Engenharia de Produção da UnB foi criado com base no método conhecido como PBL - “Problem Based Learning”, (Aprendizagem Baseada em Problemas). </CardSubtitle>
            </CardBody>
            <CardBody>
              <a onClick={() => { window.open('Edital.pdf', '_blank', 'fullscreen=yes'); return false }}>BAIXE AQUI</a>
            </CardBody>
          </Card>
        </div>
        <div style={{ flexDirection: 'row', align: 'center', width: '100%' }}>
          <div style={{ minWidth: '30%', maxWidth: '30%', float: 'left', margin: 50, marginTop: 0 }}>
            <h2 style={{ marginLeft: 20 }}>Notícias</h2>
            {data.map((d, idx) => this.renderCard(d, idx))}
          </div>
          <div style={{ minWidth: '30%', maxWidth: '30%', float: 'right', margin: 50, marginTop: 0 }}>
            <h2 style={{ marginLeft: 20 }}>Projetos</h2>
            <Card style={{ margin: 10, marginBottom: 20 }}>
            <CardImg top width="100%" height="240px" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
              <CardBody>
                <CardTitle>{'Projeto 1'}</CardTitle>
              </CardBody>
              <CardBody>
                <CardText>{'Descrição do Projeto 1'}</CardText>
                <CardLink href="#">Ler mais...</CardLink>
              </CardBody>
            </Card>
            <Card style={{ margin: 10, marginBottom: 20 }}>
            <CardImg top width="100%" height="240px" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
              <CardBody>
                <CardTitle>{'Projeto 2'}</CardTitle>
              </CardBody>
              <CardBody>
                <CardText>{'Descrição do Projeto 2'}</CardText>
                <CardLink href="#">Ler mais...</CardLink>
              </CardBody>
            </Card>
            <Card style={{ margin: 10, marginBottom: 20 }}>
            <CardImg top width="100%" height="240px" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
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
