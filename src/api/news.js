import PumaApi from './puma';
import { auth } from '../helpers/token';

export default {
  getNews: () => PumaApi.get(`/api/noticia/?limit=3`),

  postNews: (author, title, body) => {
    const data = {
      author: author,
      title: title,
      body: body,
    };
    return PumaApi.post('/sec/post/new', data, auth);
  },
};
