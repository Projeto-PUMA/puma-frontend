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
      <div key={d.id}>
        <div className="card-deck" onClick={() => this.viewNews(d.id)}>
          <div className="card">
            <div className="card-body" style={{backgroundColor: '#09545e', color: '#ffffff'}}>
              <h5 className="card-title">{d.titulo}</h5>
          </div>
          <img src={d.urlThumbnail && d.urlThumbnail !== '' ? d.urlThumbnail : 'http://vanguardacomunicacao.com.br/santoremedio/wp-content/uploads/2018/07/img.jpg'} className="card-img-top" alt="Card cap" />
          <div className="card-body">
            <p className="card-text">{d.subtitulo}</p>
            <a className="btn btn-primary" style={{ backgroundColor: '#0C7D40', color: '#ffffff' }}>Ler mais</a>
          </div>
          <div className="card-footer" style={{backgroundColor: '#09545e'}}></div>
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
      <div id='content' style={{marginTop: -8, width: '100%', height: '100%' }}>
        <div style={{ marginTop: 40, width: '100%', align: 'center', marginBottom: 20 }}>
          { data.length > 1 ? <CarouselApp data={data.filter(this.filterNews(1)).slice(0, 3)} /> : null }
        </div>
        <div className="container text-center" style={{ textAlign: 'center', marginTop: 50, paddingTop: "30px" }}>
        <h1 className="jumbotron-heading">PROJETO DE SISTEMAS DE PRODUÇÃO (PSP)</h1>
          <img style={{ margin: 30, marginBottom: 0 }} alt="Imagem" src='http://producaounb.com.br/psp/wp-content/uploads/2017/06/new-piktochart_22996966_97374f78a6650361fd0822dc8046ce3c8857fed2-1.png' />
        <p className="lead text-muted"><b>As disciplinas de PSP que adotam a metodologia PBL, tem como objetivo fazer o aluno “aprender na prática”, aplicando os conhecimentos teóricos da Engenharia de Produção na resolução de problemas reais. Os PSPs resolvem problemas vinculados às áreas técnicas de Probabilidade Estatística, Sistema de Informação, Planejamento e Controle da Produção, Gestão da Qualidade, Engenharia do Produto e Gestão Estratégica. Os estudantes trabalham em equipes e participam de todas as etapas dos projetos, desde o planejamento até o encerramento. Além de promover a geração de novas soluções, os PSPs proporcionam uma experiência completa de gerenciamento de projetos.</b></p>
        </div>
        <section style={{backgroundColor: '#000000', paddingBotton: '20px', paddingTop: '20px'}}>
        <div className="container">
          <div className="row" style={{color: "#ffffff"}}>
            <div className="col-sm-3 text-center">
              <h1>360</h1>
              <h6>Projetos Realizados</h6>
            </div>
            <div className="col-sm-3 text-center">
              <h1>200</h1>
              <h6>Empresas Atendidas</h6>
            </div>
            <div className="col-sm-6 text-center">
              <h1>NOSSAS SOLUÇÕES</h1>
              <h6>Os projetos acontecem semestralmente, à depender da área de atuação de cada disciplina âncora.</h6>
            </div>
          </div>
        </div>
        </section>
        <br/>
        <div className="container">
          <h1 className="text-center">Últimas Notícias</h1>
            <br/>
            <div className="card">
            <div className="card-header">
            </div>
            <div className="card-body">
              <h5 className="card-title">Aberto Edital 01/2019</h5>
              <p className="card-text">A fim de alcançar esse objetivo global o Plano Político Pedagógico do Curso de Engenharia de Produção da UnB foi criado com base no método conhecido como PBL - “Problem Based Learning”, (Aprendizagem Baseada em Problemas).</p>
              <a className="btn btn-primary" href="http://pumaunb.herokuapp.com/Edital.pdf" target="_blank" rel="noopener noreferrer" style={{backgroundColor:  '#09545e'}}>Baixe Aqui</a>
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
