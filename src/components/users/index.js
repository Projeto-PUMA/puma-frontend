import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';

import Loading from '../../helpers/loading';
import { loadUsers } from '../../actions/user/index';


class Users extends Component {

	// constructor(props) {
	// 	super(props)
		
	// 	this.state = {
	// 	  value: ''
	// 	}
	//   }

	componentWillMount() {
		const { dispatch, user } = this.props;
		dispatch(loadUsers(user.token));
	}

    handle(e){
		this.setState({value: e.target.value})
	}
	
	renderTableLine(d, idx) {
		// console.log("nome "+d.nome + "papel "+JSON.stringify(d.papel))
		return (<tr key={idx}><td>{d.nome}</td><td>{d.papel.nome}</td></tr>);
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
		console.log(data);

		return (
			<div style={{margin:50, marginTop: 100}}>
				<Table id="usersTable" hover responsive>
					<thead>
						<tr>
							<th>Nome</th>
							<th>Papel</th>
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
	users: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
	user: state.user,
	users: state.user,
	loading: state.meta.syncOperation.isLoading,
});

export default connect(mapStateToProps)(Users);
