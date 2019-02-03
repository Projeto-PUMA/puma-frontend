import PumaApi from './puma';
import { auth } from '../helpers/token';

export default {
  getProjects: () => {
    return PumaApi.get(`/projeto`, auth);
  },

  getProjectById: (id) => {
    return PumaApi.get(`/projeto/${id}`, auth);
  },

  getMyProjects: (id) => {
    return PumaApi.get(`/usuario/${id}/projeto`, auth);
  },

  updateProject: (projeto) => {
    return PumaApi.patch(`/projeto/${projeto.id}`, projeto, auth);
  },

  newProject: (projeto) => {
    return PumaApi.post('/projeto', projeto, auth);
  }
};
