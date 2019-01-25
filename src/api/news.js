import PumaApi from './puma';
import { auth } from '../helpers/token';

export default {
  getNews: () => PumaApi.get(`/blog/listAll`),

  postNews: (author, title, body) => {
    const data = {
      author: author,
      title: title,
      body: body,
    };
    console.log('data', data);
    return PumaApi.post('/sec/post/new', data, auth);
  },
};
