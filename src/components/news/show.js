import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getNews } from '../../actions/news';
import Loading from '../../helpers/loading';
import { browserHistory } from 'react-router';

class ViewNews extends Component {

	componentWillMount() {
		const { dispatch, location } = this.props;
		const { id } = location.state;
		dispatch(getNews(id));
	}
	
	redirectHome() {
    browserHistory.push('/');
	}
	
	render() {
		const { news_by_id } = this.props;

    if (!news_by_id) {
      return <Loading />;
    }

		return (
			<div style={{ margin: 50, marginTop: 100 }}>
				<h2>{news_by_id.titulo}</h2>
				<h6 style={{ marginTop:10, marginBottom: 20 }}>{news_by_id.subtitulo}</h6>
				<img src={news_by_id.urlThumbnail} alt={news_by_id.subtitulo} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', height: '50vh', borderRadius: 20,backgroundColor: '#00BCD4', justifyContent: 'center',alignItems: 'center', resizeMode: 'cover'}} />
        <div style={{ marginTop: 30 }} dangerouslySetInnerHTML={{ __html: news_by_id.texto }} />
				<button style={{marginLeft: 'auto', marginRight: 'auto', display: 'block', backgroundColor: '#09545e', color: 'white', height: '40px', width: '80px', borderRadius: '8px'}} onClick={() => this.redirectHome()}>Voltar</button>
			</div>
		);
	}
}

ViewNews.propTypes = {
	news_by_id: PropTypes.object,
};

const mapStateToProps = state => ({
	news_by_id: state.news.news_by_id,
});

export default connect(mapStateToProps)(ViewNews);
