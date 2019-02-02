import projectsApi from '../../api/projects';
import * as ProjectsAC from './actionCreators';
import * as SyncOperationAC from '../meta/actionCreators';

export const loadProjects = () => (dispatch) => {
  dispatch(SyncOperationAC.syncOperationLoading());
  projectsApi.getProjects()
    .then((result) => {
      const projects = result.data;
      dispatch(ProjectsAC.fetchProjects(projects));
      dispatch(SyncOperationAC.syncOperationFinished(result));
    })
    .catch((error) => {
      console.log(error);
      alert('Ocorreu um erro ao carregar os projetos!');
    });
};