import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import { browserHistory } from 'react-router';

import { loadProjectById, updateProject } from '../../actions/projects';
import Loading from '../../helpers/loading';
import { tokenInfo } from '../../helpers/token';


class ViewProject extends Component {

	componentWillMount() {
		const { dispatch, location } = this.props;
		const { id } = location.state;
		dispatch(loadProjectById(id));
	}

	renderStatus(project) {
		if (project.projetoStatusId === 1 && project.usuarioId === tokenInfo().id) {
			return <div style={{ textAlign: "center" }}><h1 style={{ fontSize: 28, color: 'gray', textAlign: "center" }}>Status: Pendente</h1><button onClick={() => this.viewProjectToEdit(project.id)}>Editar Projeto</button></div>;
		} else if (project.status === 2) {
			return <h1 style={{ fontSize: 28, color: 'red', textAlign: "center" }}>Status: Rejeitado</h1>;
		} else if (project.status === 3) {
			return <h1 style={{ fontSize: 28, color: 'green', textAlign: "center" }}>Status: Aceito</h1>;
		}
	}

	judgeable(statusCode) {
		var admin = false;
		var role = tokenInfo().papel;
		for(var i=0; i<role.length; i++) {
			if(role[i].includes("ADMIN")) {
				admin = true;
			}
		}
		return admin && statusCode === 1 ? true : false;
	}

	updateProject(projeto, status) {
		const { dispatch } = this.props;
		dispatch(updateProject({
			id: projeto.id,
			projeto_status_id: status,
		}));
	}

	renderJudge(projeto) {
		return (
			<div id="judge" style={{ textAlign: "center" }}>
				<button style={{ margin: 3 }} onClick={() => this.updateProject(projeto, 2)}>Aceitar</button>
				<button style={{ margin: 3 }} onClick={() => this.updateProject(projeto, 3)}>Rejeitar</button>
				<br></br>
				<label style={{ display: "inline-block", verticalAlign: "center" }}>
					Resposta:
				</label>
				<textarea style={{ verticalAlign: "middle", margin: 5, width: "500px", height: "150px" }} type='text' id="answer" required />
			</div>
		);
	}

	viewProjectToEdit(id) {
		browserHistory.push({
			pathname: '/projeto/editar',
			state: {
				id: id,
			},
		});
	}

	render() {
		const { project_by_id, loading } = this.props;

		if (loading) {
			return <Loading />;
		}

		return (
			<div style={{ margin: 50 }}>
				<Card style={{ margin: 100 }}>
					<CardBody>
						<li style={{ fontSize: "20px", fontWeight: "bold", marginLeft: 5 }}>Título do Projeto: </li><p style={{ marginLeft: 33, marginTop: 8 }}>{project_by_id.titulo}</p>
						<li style={{ fontSize: "20px", fontWeight: "bold", margin: 5 }}>Objetivo: </li> <p style={{ marginLeft: 33, marginTop: 8 }}>{project_by_id.objetivo}</p>
						<li style={{ fontSize: "20px", fontWeight: "bold", margin: 5 }}>Problema a ser resolvido: </li> <p style={{ marginLeft: 33, marginTop: 8 }}>{project_by_id.problematica}</p>
						<li style={{ fontSize: "20px", fontWeight: "bold", margin: 5 }} id="area">Área: </li> <p style={{ marginLeft: 33, marginTop: 8 }}>{project_by_id.psp ? project_by_id.psp.nome : ''}</p>
						<li style={{ fontSize: "20px", fontWeight: "bold", margin: 5 }}>Autor: </li> <p style={{ marginLeft: 33, marginTop: 8 }}>{project_by_id.usuario ? project_by_id.usuario.nome : ''}</p>
						<li style={{ fontSize: "20px", fontWeight: "bold", margin: 5 }} id="answerShow">Resposta: </li> <p style={{ marginLeft: 33, marginTop: 8 }}>{project_by_id.status ? project_by_id.status.status : ''}</p>
						<div id="status">{this.renderStatus(project_by_id)}</div>
						{this.judgeable(project_by_id.projetoStatusId) ? this.renderJudge(project_by_id) : null}
					</CardBody>
				</Card>
			</div>
		);
	}
}

ViewProject.propTypes = {
	project_by_id: PropTypes.object,
	loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
	project_by_id: state.project.project_by_id,
	loading: state.meta.syncOperation.isLoading,
});

export default connect(mapStateToProps)(ViewProject);
