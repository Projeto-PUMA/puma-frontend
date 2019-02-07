import React, { Component } from 'react';

const LoadingAnimation = require('../lib/react-loading-animation/index');

export default class Loading extends Component {
  render() {
    return (
      <LoadingAnimation style={{ marginTop: 30 }} />
    );
  }
};
