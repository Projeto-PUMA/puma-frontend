import React, { Component } from 'react';

export default class Confirmation extends Component {
  render() {
    const { location } = this.props;
    return (
      <div style={{ height: '300px', width: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center', verticalAlign: 'center', marginTop: 100 }}>
        <h1 style={{ alignSelf: 'center' }}>Usuário cadastrado com sucesso!</h1>
        <h2 style={{ alignSelf: 'center' }}>Enviamos um email de confirmação para { location.state ? location.state.email : '' }!</h2>
      </div>
    );
  }
};
