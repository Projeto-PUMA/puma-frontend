import projectsApi from '../../api/projects';
import * as ProjectsAC from './actionCreators';
import * as MetaAC from '../meta/actionCreators';

export const loadProjects = () => (dispatch) => {
  dispatch(MetaAC.syncOperationLoading());
  projectsApi.getProjects()
    .then((result) => {
      const projects = result.data;
      dispatch(ProjectsAC.fetchProjects(projects));
      dispatch(MetaAC.syncOperationFinished(result));
    })
    .catch((error) => {
      console.log(error);
      alert('Ocorreu um erro ao carregar os projetos!');
    });
};