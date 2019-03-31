import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadNews } from '../../actions/news/index';
import Loading from '../../helpers/loading';
import { Table } from 'reactstrap';
import { browserHistory } from 'react-router';
import { deleteNews } from '../../actions/news';
import { tokenInfo } from '../../helpers/token';

class News extends Component {

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

	renderTableLine(d, idx) {
		var role = tokenInfo().papel;

		if (role) {
			for (var i = 0; i < role.length; i++) {
				if (role[i].includes("ADMIN") || role[i].includes("COORDENADOR")) {
					return (
						<tr key={idx}>
							<td>{d.titulo}</td>
							<td>{d.usuario.nome}</td>
							<td>
								<i className="fas fa-trash" onClick={() => { this.deleteNews(d.id, idx) }}></i>
							</td>
							<td>
								<i className="fas fa-edit" onClick={() => this.viewNewsToEdit(d.id)}></i>
							</td>
							<td>
								<i className="fas fa-eye" onClick={() => this.viewNews(d.id)}></i>
							</td>
						</tr>
					);
				}

				if (role[i].includes("SECRETARIA") || role[i].includes("MONITOR")) {
					return (
						<tr key={idx}>
							<td>{d.titulo}</td>
							<td>{d.usuario.nome}</td>
							<td>
								<i className="fas fa-eye" onClick={() => this.viewNews(d.id)}></i>
							</td>
						</tr>
					);
				}
			}
		}
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

		var role = tokenInfo().papel;

		if (role) {
			for (var i = 0; i < role.length; i++) {
				if (role[i].includes("ADMIN") || role[i].includes("COORDENADOR")) {
					return (
						<div style={{ margin: 50, marginTop: 100 }}>
							<Table id="newsTable" hover responsive>
								<thead >
									<tr>
										<th>Título</th>
										<th>Autor</th>
										<th></th>
										<th></th>
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
				if (role[i].includes("SECRETARIA") || role[i].includes("MONITOR")) {
					return (
						<div style={{ margin: 50, marginTop: 100 }}>
							<Table id="newsTable" hover responsive>
								<thead >
									<tr>
										<th>Título</th>
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
		}
	}
}

News.propTypes = {
	news: PropTypes.object.isRequired,
	user: PropTypes.object,
	loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
	news: state.news,
	user: state.user,
	loading: state.meta.syncOperation.isLoading,
});

export default connect(mapStateToProps)(News);
