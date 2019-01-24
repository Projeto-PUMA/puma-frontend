import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadNews } from '../../actions/news/index';
import Grid from './Grid';

class Home extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(loadNews());
  }

  render() {

    const { news } = this.props;

    const data = [];
    for (var key in news) {
      news[key].key = key;
      data.push(news[key]);
    }
    
    return (
      <Grid data={data} />
    );
  }
}

Home.propTypes = {
  news: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  news: state.news,
});

export default connect(mapStateToProps)(Home);
