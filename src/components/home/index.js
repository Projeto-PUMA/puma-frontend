import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadNews } from '../../actions/news/index';
import Grid from './Grid';
import Loading from '../../helpers/loading';

class Home extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(loadNews());
  }

  render() {

    const { news, loading } = this.props;

    if (loading) {
      return <Loading />;
    }

    const data = [];
    for (var key in news) {
      if (!isNaN(key)) {
        news[key].key = key;
        data.push(news[key]);
      }
    }

    return (
      <Grid data={data} />
    );
  }
}

Home.propTypes = {
  news: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  news: state.news,
  loading: state.syncOperation.isLoading,
});

export default connect(mapStateToProps)(Home);
