import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Card, CardBody, Form, FormGroup, Label, Input } from 'reactstrap';

import Loading from '../../helpers/loading';
import { loadUserById, updateUser } from '../../actions/user/index';

class ViewUser extends Component {

	constructor(props) {
		super(props)
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	state = {
		category: 0
	}

	componentWillMount() {
		const { dispatch, location } = this.props;
		const { id } = location.state;
		dispatch(loadUserById(id));
	}

	handleUpdate(e) {
		e.preventDefault();
		const { dispatch, user, user_by_id } = this.props;
		const { category } = this.state;
		dispatch(updateUser(user_by_id.id, {
			papel: [{
				id: category
			}]
		}, user.token));

	}

	handleChange(event) {
		this.setState({ category: event.target.value });
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
						<Form id='userUpdateForm' name='userUpdateForm' onSubmit={this.handleUpdate}>
							<FormGroup>
								<Label for='title'>Papel</Label>
								<Input ref='title' type='select' name='category' id='category' value={this.state.category === 0 ? user_by_id.papel[0].id : this.state.category} onChange={this.handleChange} required>
									<option ref="0" value={0} defaultValue disabled>Selecionar Categoria</option>
									<option ref="1" value={1} className="optionGroup" >Administrador</option>
									<option ref="2" value={2} className="optionGroup" >Coordenador</option>
									<option ref="3" value={3} className="optionGroup" >Professor</option>
									<option ref="4" value={4} className="optionGroup" >Aluno</option>
									<option ref="5" value={5} className="optionGroup" >Monitor</option>
									<option ref="6" value={6} className="optionGroup" >Secretaria</option>
									<option ref="7" value={7} className="optionGroup" >Usuario</option>
								</Input>
							</FormGroup>
							<Button type="submit" value="submit" color="primary" style={{ display: "block", margin: "0 auto" }}>
								Atualizar Usuário
              </Button>
						</Form>
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
