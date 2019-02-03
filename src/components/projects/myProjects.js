import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import { browserHistory } from 'react-router';
import { tokenInfo } from '../../helpers/token';
import { loadMyProjects } from '../../actions/projects';
import Loading from '../../helpers/loading';

class MyProjects extends Component {

	componentWillMount() {
		const { dispatch } = this.props;
		dispatch(loadMyProjects(tokenInfo().id));
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
			return <td bgcolor="#FAFAE6">Pendente</td>;
		} else if (statusCode===2) {
			return <td bgcolor="#90EE90">Aceito</td>;
		} else if (statusCode===3) {
			return <td bgcolor="#FF6961">Rejeitado</td>;
		}
	}

	renderTableLine(d, idx) {
		return (<tr key={idx}><td>{d.titulo}</td><td>{d.objetivo.substring(0, 30)}</td>{this.renderStatus(d.projetoStatusId)}<td><i className="fas fa-eye" onClick={() => this.viewProject(d.id)}></i></td></tr>);
	}

  render() {
		const { my_projects, loading } = this.props;

    if (loading || !my_projects) {
      return <Loading />;
    }

    const data = [];
    for (var key in my_projects) {
			if(!isNaN(key)) {
				my_projects[key].key = key;
      	data.push(my_projects[key]);
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

MyProjects.propTypes = {
	my_projects: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
	my_projects: state.project.my_projects,
	loading: state.meta.syncOperation.isLoading,
});

export default connect(mapStateToProps)(MyProjects);
