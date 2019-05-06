import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import { browserHistory } from 'react-router';

import Loading from '../../helpers/loading';
import { loadUsers } from '../../actions/user/index';


class Users extends Component {

	componentWillMount() {
		const { dispatch } = this.props;
		dispatch(loadUsers());
	}

    handle(e){
		this.setState({value: e.target.value})
	}
	
	viewUser(id) {
    browserHistory.push({
      pathname: '/usuario',
      state: {
        id: id,
      },
    });
	}

	renderTableLine(d, idx) {
		return (<tr key={d.id}><td>{d.nome}</td><td>{d.papel[0].nome}</td><td><i className="fas fa-eye" onClick={() => this.viewUser(d.id)}></i></td></tr>);
	}

	render() {
		const { users, loading } = this.props;
    if (loading || !users) {
      return <Loading />;
		}
		
		const data = [];
		for (var key in users) {
			if (!isNaN(key)) {
				users[key].key = key;
				data.push(users[key]);
			}
		}

		return (
			<div style={{margin:50, marginTop: 100}}>
				<Table id="usersTable" hover responsive>
					<thead>
						<tr>
							<th>Nome</th>
							<th>Papel</th>
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

Users.propTypes = {
	user: PropTypes.object,
	users: PropTypes.object,
	loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
	user: state.user.setUser,
	users: state.user.users,
	loading: state.meta.syncOperation.isLoading,
});

export default connect(mapStateToProps)(Users);
