import PumaApi from './puma';
import { auth } from '../helpers/token';

export default {
  getNews: () => PumaApi.get(`/noticia`),

  getNewsId: (id) => PumaApi.get(`/noticia/${id}`),

  postNews: (title, subtitle, body, author, image, category) => {
    const data = {
      titulo: title,
      subtitulo: subtitle,
      texto: body,
      usuario_id: author,
      url_thumbnail: image,
      noticia_categoria_id: category,
    };
    return PumaApi.post('/noticia', data, auth);
  },

  deleteNews: (id) => {
    return PumaApi.delete(`/noticia/${id}`, auth);
  },

  updateNews: (news) => {
    return PumaApi.patch(`/noticia/${news.id}`, news, auth);
  }
};
