import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadNews } from '../../actions/news/index';
import Grid from './Grid';
import Loading from '../../helpers/loading';
import { tokenInfo } from '../../helpers/token';
import { loadMyProjects } from '../../actions/projects';

class Home extends Component {

  componentWillMount() {
    const { dispatch, user } = this.props;
    dispatch(loadNews());
		if (tokenInfo()) dispatch(loadMyProjects(tokenInfo().id, user.token));
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
  user: PropTypes.object,
  news: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  user: state.user.setUser,
  news: state.news,
  loading: state.meta.syncOperation.isLoading,
});

export default connect(mapStateToProps)(Home);
