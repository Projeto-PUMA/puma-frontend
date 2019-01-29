import { browserHistory } from 'react-router';
import newsApi from '../../api/news';
import * as NewsAC from './actionCreators';
import * as SyncOperationAC from '../meta/actionCreators';

export const loadNews = () => (dispatch) => {
  dispatch(SyncOperationAC.syncOperationLoading());
  newsApi.getNews()
    .then((result) => {
      const news = result.data;
      dispatch(NewsAC.fetchNews(news));
      dispatch(SyncOperationAC.syncOperationFinished(result));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createNews = (title, subtitle, body, author, category) => (dispatch) => {
  const thenCallback = (result) => {
    dispatch(SyncOperationAC.syncOperationFinished(result));
    dispatch(loadNews());
    browserHistory.push('/gerenciarnoticias');
    if (result.status === 200) {
      alert('Notícia criada com sucesso!');
    }
  };

  const catchCallback = (error) => {
    alert('Notícia não cadastrada!');
    console.log('create news error: ', error);
    dispatch(SyncOperationAC.syncOperationFinished(error));
  };

  dispatch(SyncOperationAC.syncOperationLoading());
  newsApi.postNews(title, subtitle, body, author, category)
      .then(thenCallback)
      .catch(catchCallback);
};
