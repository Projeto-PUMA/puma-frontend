import PumaApi from './puma';
import { auth } from '../helpers/token';

export default {
  getNews: () => PumaApi.get(`/noticia`),

  postNews: (title, subtitle, body, author, category) => {
    const data = {
      titulo: title,
      subtitulo: subtitle,
      texto: body,
      usuario_id: author,      
      noticia_categoria_id: category,
    };
    return PumaApi.post('/noticia', data, auth);
  },

  deleteNews: (id) => {
    return PumaApi.delete(`/noticia/${id}`, auth);
  }
};
