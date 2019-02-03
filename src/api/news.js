import PumaApi from './puma';
import { authToken } from '../helpers/token';

export default {
  getNews: () => PumaApi.get(`/noticia`),

  getNewsId: (id) => PumaApi.get(`/noticia/${id}`),

  postNews: (title, subtitle, body, author, image, category, token) => {
    const data = {
      titulo: title,
      subtitulo: subtitle,
      texto: body,
      usuario_id: author,
      url_thumbnail: image,
      noticia_categoria_id: category,
    };
    return PumaApi.post('/noticia', data, authToken(token));
  },

  deleteNews: (id, token) => {
    return PumaApi.delete(`/noticia/${id}`, authToken(token));
  },

  updateNews: (news, token) => {
    return PumaApi.patch(`/noticia/${news.id}`, news, authToken(token));
  }
};
