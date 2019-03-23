import React, { Component } from 'react';
import {
  Button,
  Form,
  Label,
  Input
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadNews } from '../../actions/news/index';
import Loading from '../../helpers/loading';
import { Table } from 'reactstrap';
import { browserHistory } from 'react-router';
import { deleteNews } from '../../actions/news';

class Peer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      opened: null,
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(loadNews());
  }

  viewNews(id) {
    browserHistory.push({
      pathname: '/noticia',
      state: {
        id: id,
      },
    });
  }

  viewNewsToEdit(id) {
    browserHistory.push({
      pathname: '/submeternoticia',
      state: {
        id: id,
      },
    });
  }

  deleteNews(id) {
    const { dispatch, user } = this.props;
    dispatch(deleteNews(id, user.token));
  }

  renderItemsTable() {

    return (
      <div style={{ marginTop: 40, padding: 16 }}>
        <Table hover responsive>
          <thead>
            <tr>
              <th>Ativação</th>
              <th>Sub-itens</th>
              <th>Descrição</th>
              <th>Ação</th>
              <th>Pesos</th>
            </tr>
          </thead>
          {/* <tbody>
            {data.map((d, idx) => this.renderTableLine(d, idx))}
          </tbody> */}
        </Table>
        <div>
        <Form
          id='loginForm'
          name='loginForm'
          onSubmit={this.handleLogin}
          style={{ padding: 100, paddingLeft: 0, textAlign: 'left' }}
          >
            <Label>Novo Sub-item</Label>
            <Input
            ref="name"
            type="text"
            name='name'
            id='name'
            maxLength="11"
            required
            style={{ width: 360, marginBottom: 12 }}
            />
            <Label>Descrição</Label>
            <Input
            ref="description"
            type="text"
            name='description'
            id='description'
            required
            style={{ width: 360, marginBottom: 12 }}
            />
            <Label>Peso</Label>
            <Input
            ref="weight"
            type="number"
            name='weight'
            id='weight'
            required
            style={{ width: 360, marginBottom: 12 }}
            />
          <Button type="submit" value="submit" color="primary" style={{ marginTop: 30 }}>
          Adicionar
          </Button>
          </Form> 
        </div>
      </div>
    );
  }



  renderTableLine(d, idx) {
    return (
      <tr key={idx}>
        <td style={{ width: 30 }}><input type="checkbox" style={{ margin: 0, padding: 0, width: 14 }} /></td>
        <td style={{ textAlign: 'left' }}>
          {d.usuario.nome}
          {this.state.opened === idx ? this.renderItemsTable() : null}
        </td>
        <td style={{ width: 62 }}>
          <i className="fas fa-trash" onClick={() => { this.deleteNews(d.id, idx) }}></i>
          <i className="fas fa-edit" style={{ marginLeft: 8 }} onClick={() => this.viewNewsToEdit(d.id)}></i>
        </td>
        <td style={{ width: 36 }}>
          <i className="fas fa-eye" onClick={() => this.state.opened === idx ? this.setState({ opened: null }) : this.setState({ opened: idx })}></i>
        </td>
      </tr>
    );
  }

  render() {
    const { news, loading } = this.props;

    if (loading || !news) {
      return <Loading />;
    }

    const data = [];
    for (var key in news) {
      if (!isNaN(key)) {
        news[key].key = key;
        data.push(news[key]);
      }
    }

    return (
      <div style={{ margin: 50, marginTop: 100 }}>
        <Table id="newsTable" hover responsive>
          <thead >
            <tr>
              <th>Ativação</th>
              <th>Competência</th>
              <th>Ação</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, idx) => this.renderTableLine(d, idx))}
          </tbody>
        </Table>
      </div>
    );
  }
}

Peer.propTypes = {
  news: PropTypes.object.isRequired,
  user: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  news: state.news,
  user: state.user,
  loading: state.meta.syncOperation.isLoading,
});

export default connect(mapStateToProps)(Peer);
