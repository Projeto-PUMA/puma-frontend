import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import { browserHistory } from 'react-router';

import Loading from '../../helpers/loading';
import { loadProjects } from '../../actions/projects';

class Projects extends Component {

	componentWillMount() {
		const { dispatch, user } = this.props;
		dispatch(loadProjects(user.token));
	}
  
  viewProject(id) {
    browserHistory.push({
      pathname: '/projeto',
      state: {
        id: id,
      },
    });
	}

	renderStatus(statusCode) {
		if (statusCode===1) {
			return <i style={{color: 'black'}} className="fas fa-ellipsis-h"></i>;
		} else if (statusCode===3) {
			return <i style={{color: 'red'}} className="fas fa-ban"></i>;
		} else if (statusCode===2) {
			return <i style={{color: 'green'}} className="fas fa-check"></i>;
		}
	}

	renderTableLine(d, idx) {
		return (<tr key={idx}><td>{d.titulo}</td><td>{d.problematica.substring(0, 30)}</td><td>{this.renderStatus(d.projetoStatusId)}</td><td>{d.usuario.nome}</td><td><i className="fas fa-eye" onClick={() => this.viewProject(d.id)}></i></td></tr>);
	}

  render() {
		const { projects, loading } = this.props;

    if (loading || !projects) {
      return <Loading />;
    }

    const data = [];
    for (var key in projects) {
			if(!isNaN(key)) {
				projects[key].key = key;
      	data.push(projects[key]);
			}
		}

    return (
			<div style={{margin:50, marginTop: 100}}>
				<Table id="newsTable" hover responsive>
					<thead>
						<tr>
							<th>Título</th>
							<th>Descrição</th>
							<th>Status</th>
							<th>Autor</th>
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

Projects.propTypes = {
	user: PropTypes.object,
	projects: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
	user: state.user,
	projects: state.project.projects,
	loading: state.meta.syncOperation.isLoading,
});

export default connect(mapStateToProps)(Projects);
