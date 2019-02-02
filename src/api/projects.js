import PumaApi from './puma';
import { auth } from '../helpers/token';

export default {
  getProjects: () => PumaApi.get(`/projeto`, auth),

  getProjectId: (id) => PumaApi.get(`/projeto/${id}`),

  getMyProjects: (id) => PumaApi.get(`/projeto/${id}`),
};
