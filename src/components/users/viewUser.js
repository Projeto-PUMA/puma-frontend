import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardBody } from 'reactstrap';

import Loading from '../../helpers/loading';
import { loadUserById } from '../../actions/user/index';


class ViewUser extends Component {

	constructor(props) {
		super(props)
		
		this.state = {
		  value: ''
		}
	  }

	componentWillMount() {
		const { dispatch, location, user } = this.props;
        const { id } = location.state;
		dispatch(loadUserById(id, user.token));
	}

	handle(e){
		this.setState({value: e.target.value})
	}

	render() {
		const { user_by_id, loading } = this.props;
		if (loading || user_by_id === null) {
			return <Loading />;
		}

		return (
			<div style={{ margin: 50 }}>
				<Card style={{ margin: 100 }}>
					<CardBody>
						<li style={{ fontSize: "20px", fontWeight: "bold", marginLeft: 5 }}>Nome: </li><p style={{ marginLeft: 33, marginTop: 8 }}>{user_by_id.nome}</p>
                        <li style={{ fontSize: "20px", fontWeight: "bold", marginLeft: 5 }}>Escolaridade: </li><p style={{ marginLeft: 33, marginTop: 8 }}>{user_by_id.escolaridade}</p>
                        <li style={{ fontSize: "20px", fontWeight: "bold", marginLeft: 5 }}>E-mail: </li><p style={{ marginLeft: 33, marginTop: 8 }}>{user_by_id.email}</p>
                        <li style={{ fontSize: "20px", fontWeight: "bold", marginLeft: 5 }}>Papel: </li><p style={{ marginLeft: 33, marginTop: 8 }}>{user_by_id.papel[0].nome}</p>

					</CardBody>
				</Card>
			</div>
		);
	}
}

ViewUser.propTypes = {
	user: PropTypes.object,
	user_by_id: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
	user: state.user.setUser,
	user_by_id: state.user.user_by_id,
	loading: state.meta.syncOperation.isLoading,
});

export default connect(mapStateToProps)(ViewUser);
