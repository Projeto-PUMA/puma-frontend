import { browserHistory } from 'react-router';
import newsApi from '../../api/news';
import * as NewsAC from './actionCreators';
import * as MetaAC from '../meta/actionCreators';

export const loadNews = () => (dispatch) => {
  dispatch(MetaAC.syncOperationLoading());
  newsApi.getNews()
    .then((result) => {
      const news = result.data;
      dispatch(NewsAC.fetchNews(news));
      dispatch(MetaAC.syncOperationFinished(result));
    })
    .catch((error) => {
      console.log(error);
      dispatch(MetaAC.syncOperationFinished(error));
    });
};

export const getNews = (id) => (dispatch) => {
  dispatch(MetaAC.syncOperationLoading());
  newsApi.getNewsId(id)
      .then((result) => {
        dispatch(NewsAC.getNews(result.data));
        dispatch(MetaAC.syncOperationFinished(result));
      })
      .catch((error) => {
        console.log(error);
        dispatch(MetaAC.syncOperationFinished(error));
      });
};

export const updateNews = (news, token) => (dispatch) => {
  dispatch(MetaAC.syncOperationLoading());
  newsApi.updateNews(news, token)
      .then((result) => {
        browserHistory.push('/gerenciarnoticias');
        if(result.status === 200) {
          alert('Notícia atualizada com sucesso!');
        }
        dispatch(MetaAC.syncOperationFinished(result));
        dispatch(loadNews());
      })
      .catch((error) => {
        alert('Ocorreu um erro ao atualizar a notícia!');
        console.log('update news error: ', error);
        dispatch(MetaAC.syncOperationFinished(error));
      });
}

export const createNews = (title, subtitle, body, author, image, category, token) => (dispatch) => {
  const thenCallback = (result) => {
    dispatch(MetaAC.syncOperationFinished(result));
    dispatch(loadNews());
    browserHistory.push('/gerenciarnoticias');
    if (result.status === 200) {
      alert('Notícia criada com sucesso!');
    }
  };

  const catchCallback = (error) => {
    alert('Notícia não cadastrada!');
    console.log('create news error: ', error);
    dispatch(MetaAC.syncOperationFinished(error));
  };

  dispatch(MetaAC.syncOperationLoading());
  newsApi.postNews(title, subtitle, body, author, image, category, token)
      .then(thenCallback)
      .catch(catchCallback);
};

export const deleteNews = (id, token) => (dispatch) => {
  const thenCallback = (result) => {
    dispatch(MetaAC.syncOperationFinished(result));
    dispatch(loadNews());
    if (result.status === 200) {
      alert('Notícia deletada com sucesso!');
    }
  };

  const catchCallback = (error) => {
    alert('Notícia não deletada!');
    console.log('create news error: ', error);
    dispatch(MetaAC.syncOperationFinished(error));
  };

  dispatch(MetaAC.syncOperationLoading());
  newsApi.deleteNews(id, token)
      .then(thenCallback)
      .catch(catchCallback);
};
