import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Loading from './loading';
import { tokenConfirm } from '../actions/user';

class Token extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(tokenConfirm(this.props.params.token));
  }

  render() {
    const { loading } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <div style={{ height: '300px', width: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center', verticalAlign: 'center', marginTop: 100 }}>
        <h1 style={{ alignSelf: 'center' }}>Usuário confirmado com sucesso!</h1>
      </div>
    );
  }
};

Token.propTypes = {
	loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
	loading: state.meta.syncOperation.isLoading,
});

export default connect(mapStateToProps)(Token);