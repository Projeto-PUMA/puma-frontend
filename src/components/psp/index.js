import React, { Component } from "react";
import { Button, Form, Label, Input } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadPSPs, createPSP, deletePSP } from "../../actions/psp/index";
import Loading from "../../helpers/loading";
import { Table } from "reactstrap";

class PSP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: null,
      id: null
    };
    this.handlePSP = this.handlePSP.bind(this);
    this.handlePSPFather = this.handlePSPFather.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(loadPSPs());
  }

  deletePSP = id => {
    const { dispatch } = this.props;
    dispatch(deletePSP(id));
  };

  renderItemsTable(area) {
    return (
      <div style={{ marginTop: 40, padding: 16 }}>
        <Table hover responsive color="light">
          {/* className="table table-light table-bordered" */}
          <thead class="thead-light">
            <tr>
              <th>Ativação</th>
              <th>Área de aplicação</th>
              {/* style="text-align:center; min-width: 165px;" */}
              <th>Descrição</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {(area || []).map((d, idx) => this.renderTableLine(d, idx))}
          </tbody>
        </Table>
        <div className="card card-body">
          <Form
            id="areaForm"
            name="areaForm"
            onSubmit={this.handlePSP}
            style={{ padding: 100, paddingLeft: 0, textAlign: "left" }}
          >
            <Label>Nova área de aplicação</Label>
            <Input
              ref="name"
              type="text"
              name="name"
              id="name"
              required
              style={{ width: 360, marginBottom: 12 }}
            />
            <Label>Descrição</Label>
            <Input
              ref="description"
              type="text"
              name="description"
              id="description"
              required
              style={{ width: 360, marginBottom: 12 }}
            />
            {/* TODO: Ativação */}
            <Button
              type="submit"
              value="submit"
              color="primary"
              style={{ marginTop: 30 }}
            >
              Adicionar
            </Button>
          </Form>
        </div>
      </div>
    );
  }

  handlePSP(e) {
    e.preventDefault();
    var data = new FormData(e.target);
    const { dispatch } = this.props;
    dispatch(
      createPSP(data.get("name"), data.get("description"), this.state.id)
    );
    return false;
  }

  handlePSPFather(e) {
    e.preventDefault();
    var data = new FormData(e.target);
    const { dispatch } = this.props;
    dispatch(createPSP(data.get("name"), data.get("description"), null));
    return false;
  }

  renderTableLine(d, idx) {
    return (
      <tr key={d.id}>
        <td style={{ width: 30 }}>
          <input type="checkbox" style={{ margin: 0, padding: 0, width: 14 }} />
        </td>
        <td style={{ textAlign: "left" }}>
          {d.nome}
          {this.state.opened === idx && d.pspPaiId === null
            ? this.renderItemsTable(Object.values(d.area))
            : null}
        </td>
        <td style={{ textAlign: "left" }}>{/* TODO: Disciplina âncora */}</td>
        <td style={{ textAlign: "left" }}>
          {d.descricao}
          {this.state.opened === idx && d.pspPaiId === null
            ? this.renderItemsTable(Object.values(d.area))
            : null}
        </td>
        <td style={{ width: 62 }}>
          <i className="fas fa-trash" onClick={() => this.deletePSP(d.id)} />
          <i
            className="fas fa-edit"
            style={{ marginLeft: 8 }}
            onClick={() => {}}
          />
        </td>
        <td style={{ width: 36 }}>
          <i
            className="fas fa-eye"
            onClick={() =>
              this.state.opened === idx
                ? this.setState({ opened: null, id: null })
                : this.setState({ opened: idx, id: d.id })
            }
          />
        </td>
      </tr>
    );
  }

  render() {
    const { psps, loading } = this.props;

    if (loading) {
      return <Loading />;
    }

    const p = (psps || []).filter(x => x.pspPaiId === null);

    return (
      <div style={{ margin: 50, marginTop: 100 }}>
        <Table id="newsTable" hover responsive>
          <thead>
            <tr>
              <th>Ativação</th>
              <th>PSP</th>
              <th>Disciplina âncora</th>
              <th>Descrição</th>
              <th>Ação</th>
              <th />
            </tr>
          </thead>
          <tbody>{p.map((d, idx) => this.renderTableLine(d, idx))}</tbody>
        </Table>
        <div>
          <Form
            id="pspForm"
            name="pspForm"
            onSubmit={this.handlePSPFather}
            style={{ padding: 100, paddingLeft: 0, textAlign: "left" }}
          >
            <Label>Novo PSP</Label>
            <Input
              ref="name"
              type="text"
              name="name"
              id="name"
              required
              style={{ width: 360, marginBottom: 12 }}
            />
            <Label>Disciplina âncora</Label>
            <Input
              ref=""
              type="text"
              name=""
              id=""
              required
              style={{ width: 360, marginBottom: 12 }}
            />
            <Label>Descrição</Label>
            <Input
              ref="description"
              type="text"
              name="description"
              id="description"
              required
              style={{ width: 360, marginBottom: 12 }}
            />
            {/* TODO: Ativação */}
            <Button
              type="submit"
              value="submit"
              color="primary"
              style={{ marginTop: 30 }}
            >
              Adicionar
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

PSP.propTypes = {
  psps: PropTypes.array,
  user: PropTypes.object,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  psps: state.psps,
  user: state.user.setUser,
  loading: state.meta.syncOperation.isLoading
});

export default connect(mapStateToProps)(PSP);
