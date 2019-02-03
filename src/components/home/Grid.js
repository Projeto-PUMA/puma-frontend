import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CarouselApp from '../carousel/index.js';
import {
  Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, CardImg, Button
} from 'reactstrap';
import { browserHistory } from 'react-router';

class Grid extends Component {

  viewNews(id) {
    browserHistory.push({
      pathname: '/noticia',
      state: {
        id: id,
      },
    });
  }

  renderCards(d, idx) {
    return (
      <div key={idx}>
        <Card onClick={() => this.viewNews(d.id)} style={{ margin: 16, marginBottom: 20 }}>
          <CardImg top width="100%" height="240px" src={d.urlThumbnail && d.urlThumbnail !== '' ? d.urlThumbnail : 'http://vanguardacomunicacao.com.br/santoremedio/wp-content/uploads/2018/07/img.jpg'} alt="Card image cap" />
          <CardBody>
            <CardTitle>{d.titulo}</CardTitle>
            <CardLink style={{ color: 'blue' }}>Ler mais...</CardLink>
          </CardBody>
        </Card>
      </div>
    );
  }

  filterNews(category) {
    return (value) => {
      return value.noticiaCategoriaId === category;
    };
  }

  render() {
    const { data } = this.props;

    return (
      <div id='content' style={{ width: '100%', height: '100%' }}>
        <div style={{ marginTop: 40, width: '100%', align: 'center', marginBottom: 20 }}>
          { data.length > 1 ? <CarouselApp data={data.filter(this.filterNews(1)).slice(0, 3)} /> : null }
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
        <div style={{ margin: 120, marginTop: 30, marginBottom: 30 }}>
          <Card style={{ margin: 10 }}>
            <CardBody>
              <CardTitle tag="h3" style={{fontWeight: 'bold'}}>{'Aberto Edital 02/2018'}</CardTitle>
              <p></p>
              <CardSubtitle style={{ marginRight: 300 }}>A fim de alcançar esse objetivo global o Plano Político Pedagógico do Curso de Engenharia de Produção da UnB foi criado com base no método conhecido como PBL - “Problem Based Learning”, (Aprendizagem Baseada em Problemas). </CardSubtitle>
            </CardBody>
            <CardBody>
              <Button style={{ marginLeft: "800px", marginTop: "-90px", float: 'right'}} color="primary" onClick={() => { window.open('Edital.pdf', '_blank', 'fullscreen=yes'); return false }}>BAIXE AQUI</Button>
            </CardBody>
          </Card>
        </div>
        <div style={{ flexDirection: 'row', align: 'center', width: '100%' }}>
          <div style={{ minWidth: '30%', maxWidth: '30%', float: 'left', margin: 120, marginTop: 0 }}>
            <h2 style={{ marginLeft: 20 }}>Notícias</h2>
            { data.filter(this.filterNews(2)).slice(0, 3).map((d, idx) => this.renderCards(d, idx)) }
          </div>
          <div style={{ minWidth: '30%', maxWidth: '30%', float: 'right', margin: 120, marginTop: 0 }}>
            <h2 style={{ marginLeft: 20 }}>Projetos</h2>
            { data.filter(this.filterNews(3)).slice(0, 3).map((d, idx) => this.renderCards(d, idx)) }
          </div>
        </div>
      </div>
    );
  }
}

Grid.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Grid;
