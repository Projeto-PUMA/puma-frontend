import PumaApi from './puma';
import { authToken } from '../helpers/token';

export default {
  getProjects: (token) => {
    return PumaApi.get(`/projeto`, authToken(token));
  },

  getProjectById: (id, token) => {
    return PumaApi.get(`/projeto/${id}`, authToken(token));
  },

  getMyProjects: (id, token) => {
    return PumaApi.get(`/usuario/${id}/projeto`, authToken(token));
  },

  updateProject: (projeto, token) => {
    return PumaApi.patch(`/projeto/${projeto.id}`, projeto, authToken(token));
  },

  newProject: (projeto, token) => {
    return PumaApi.post('/projeto', projeto, authToken(token));
  }
};
