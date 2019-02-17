import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CarouselApp from '../carousel/index.js';
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
        <div class="card-deck" onClick={() => this.viewNews(d.id)}>
          <div class="card">
            <div class="card-body" style={{backgroundColor: '#09545e', color: '#ffffff'}}>
              <h5 class="card-title">{d.titulo}</h5>
          </div>
          <img src={d.urlThumbnail && d.urlThumbnail !== '' ? d.urlThumbnail : 'http://vanguardacomunicacao.com.br/santoremedio/wp-content/uploads/2018/07/img.jpg'} class="card-img-top" alt="Card cap" />
          <div class="card-body">
            <p class="card-text">{d.subtitulo}</p>
            <a class="btn btn-primary" style={{ backgroundColor: '#0C7D40', color: '#ffffff' }}>Ler mais</a>
          </div>
          <div class="card-footer" style={{backgroundColor: '#09545e'}}></div>
          <br/>
        </div>
      </div>
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
        <div class="container text-center" style={{ textAlign: 'center', marginTop: 50, paddingTop: "30px" }}>
        <h1 class="jumbotron-heading">PROJETO DE SISTEMAS DE PRODUÇÃO (PSP)</h1>
          <img style={{ margin: 30, marginBottom: 0 }} alt="Imagem" src='http://producaounb.com.br/psp/wp-content/uploads/2017/06/new-piktochart_22996966_97374f78a6650361fd0822dc8046ce3c8857fed2-1.png' />
        <p class="lead text-muted"><b>Nos cursos de Projeto de Sistemas de Produção (PSP), o principal objetivo é fazer com que os alunos apliquem os conhecimentos teóricos da engenharia de produção na resolução de problemas reais. Com isso, os PSPs são focados nas áreas de: Probabilidade e Estatística, Sistema de Informação, Planejamento e Controle da Produção, Gestão da Qualidade, Engenharia do Produto e Gestão Estratégica. Os estudantes trabalham em equipes e participam de todas as etapas dos projetos, desde o planejamento até o encerramento. Além de promover a geração de novas soluções, os PSPs proporcionam uma experiência completa de gerenciamento de projetos.</b></p>
        </div>
        <section style={{backgroundColor: '#000000', paddingBotton: '20px', paddingTop: '20px'}}>
        <div class="container">
          <div class="row" style={{color: "#ffffff"}}>
            <div class="col-sm-3 text-center">
              <h1>360</h1>
              <h6>Projetos Realizados</h6>
            </div>
            <div class="col-sm-3 text-center">
              <h1>200</h1>
              <h6>Empresas Atendidas</h6>
            </div>
            <div class="col-sm-6 text-center">
              <h1>NOSSAS SOLUÇÕES</h1>
              <h6>Os projetos acontecem semestralmente, à depender da área de atuação de cada disciplina âncora.</h6>
            </div>
          </div>
        </div>
        </section>
        <br/>
        <div class="container">
          <h1 class="text-center">Últimas Notícias</h1>
            <br/>
            <div class="card">
            <div class="card-header">
            </div>
            <div class="card-body">
              <h5 class="card-title">Aberto Edital 02/2018</h5>
              <p class="card-text">A fim de alcançar esse objetivo global o Plano Político Pedagógico do Curso de Engenharia de Produção da UnB foi criado com base no método conhecido como PBL - “Problem Based Learning”, (Aprendizagem Baseada em Problemas).</p>
              <a class="btn btn-primary" href="http://pumaunb.herokuapp.com/Edital.pdf" target="_blank" rel="noopener noreferrer" style={{backgroundColor:  '#09545e'}}>Baixe Aqui</a>
            </div>
          </div>
        <div style={{ flexDirection: 'row', align: 'center', width: '100%' }}>
          <div style={{ minWidth: '30%', maxWidth: '30%', float: 'left', margin:90, marginTop: 0 }}>
            <h2 style={{ marginLeft: 20 }}>Notícias</h2>
            { data.filter(this.filterNews(2)).slice(0, 3).map((d, idx) => this.renderCards(d, idx)) }
          </div>
          <div style={{ minWidth: '30%', maxWidth: '30%', float: 'right', margin: 90, marginTop: 0 }}>
            <h2 style={{ marginLeft: 20 }}>Projetos</h2>
            { data.filter(this.filterNews(3)).slice(0, 3).map((d, idx) => this.renderCards(d, idx)) }
        </div>
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
