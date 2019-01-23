import newsApi from '../../api/news';
import * as NewsAC from './actionCreators';

export const loadNews = () => (dispatch) => {
  newsApi.getNews()
    .then((result) => {
      const news = result.data;
      dispatch(NewsAC.fetchNews(news));
    })
    .catch((error) => {
      console.log(error);
    });
};
