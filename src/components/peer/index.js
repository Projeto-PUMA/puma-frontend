import React, { Component } from 'react';
import {
  Button,
  Form,
  Label,
  Input
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadPeers, createPeer, deletePeer } from '../../actions/peer/index';
import Loading from '../../helpers/loading';
import { Table } from 'reactstrap';

class Peer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      opened: null,
      id: null,
    };
    this.handlePeer = this.handlePeer.bind(this);
    this.handlePeerFather = this.handlePeerFather.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(loadPeers());
  }

  deletePeer = (id) => {
    const { dispatch } = this.props;
    dispatch(deletePeer(id));
  }

  renderItemsTable(filho) {
    return (
      <div style={{ marginTop: 40, padding: 16 }}>
        <Table hover responsive>
          <thead>
            <tr>
              <th>Ativação</th>
              <th>Sub-itens</th>
              <th>Descrição</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {(filho || []).map((d, idx) => this.renderTableLine(d, idx))}
          </tbody>
        </Table>
        <div>
          <Form
            id='peerForm'
            name='peerForm'
            onSubmit={this.handlePeer}
            style={{ padding: 100, paddingLeft: 0, textAlign: 'left' }}
          >
            <Label>Novo Sub-item</Label>
            <Input
              ref="name"
              type="text"
              name='name'
              id='name'
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
            <Button type="submit" value="submit" color="primary" style={{ marginTop: 30 }}>
              Adicionar
          </Button>
          </Form>
        </div>
      </div>
    );
  }

  handlePeer(e) {
    e.preventDefault();
    var data = new FormData(e.target);
    const { dispatch } = this.props;
    dispatch(createPeer(data.get('name'), data.get('description'), this.state.id));
    return false;
  }

  handlePeerFather(e) {
    e.preventDefault();
    var data = new FormData(e.target);
    const { dispatch } = this.props;
    dispatch(createPeer(data.get('name'), data.get('description'), null));
    return false;
  }

  renderTableLine(d, idx) {
    return (
      <tr key={idx}>
        <td style={{ width: 30 }}><input type="checkbox" style={{ margin: 0, padding: 0, width: 14 }} /></td>
        <td style={{ textAlign: 'left' }}>
          {d.nome}
          {this.state.opened === idx && d.competenciaPaiId === null ? this.renderItemsTable(Object.values(d.filho)) : null}
        </td>
        <td style={{ width: 62 }}>
          <i className="fas fa-trash" onClick={() => this.deletePeer(d.id)}></i>
          <i className="fas fa-edit" style={{ marginLeft: 8 }} onClick={() => { }}></i>
        </td>
        <td style={{ width: 36 }}>
          <i className="fas fa-eye" onClick={() => this.state.opened === idx ? this.setState({ opened: null, id: null }) : this.setState({ opened: idx, id: d.id })}></i>
        </td>
      </tr>
    );
  }

  render() {
    const { peers, loading } = this.props;

    if (loading) {
      return <Loading />;
    }

    const p = (peers || []).filter(x => x.competenciaPaiId === null);

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
            {p.map((d, idx) => this.renderTableLine(d, idx))}
          </tbody>
        </Table>
        <div>
          <Form
            id='peerForm'
            name='peerForm'
            onSubmit={this.handlePeerFather}
            style={{ padding: 100, paddingLeft: 0, textAlign: 'left' }}
          >
            <Label>Novo Item</Label>
            <Input
              ref="name"
              type="text"
              name='name'
              id='name'
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
            <Button type="submit" value="submit" color="primary" style={{ marginTop: 30 }}>
              Adicionar
          </Button>
          </Form>
        </div>
      </div>
    );
  }
}

Peer.propTypes = {
  peers: PropTypes.array,
  user: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  peers: state.peers,
  user: state.user.setUser,
  loading: state.meta.syncOperation.isLoading,
});

export default connect(mapStateToProps)(Peer);
