import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    return (
      <div style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ alignSelf: 'center' }}>Carregando...</h1>
      </div>
    );
  }
};
