import projectsApi from '../../api/projects';
import { browserHistory } from 'react-router';
import * as ProjectsAC from './actionCreators';
import * as MetaAC from '../meta/actionCreators';

export const loadProjects = (token) => (dispatch) => {
  dispatch(MetaAC.syncOperationLoading());
  projectsApi.getProjects(token)
    .then((result) => {
      if (result.status === 200) {
        const projects = result.data;
        dispatch(ProjectsAC.fetchProjects(projects));
      }
      dispatch(MetaAC.syncOperationFinished(result));
    })
    .catch((error) => {
      console.log(error);
      alert('Ocorreu um erro ao carregar os projetos!');
      dispatch(MetaAC.syncOperationFinished(error));
    });
};

export const loadMyProjects = (id, token) => (dispatch) => {
  dispatch(MetaAC.syncOperationLoading());
  projectsApi.getMyProjects(id, token)
    .then((result) => {
      if (result.status === 200) {
        const projects = result.data;
        dispatch(ProjectsAC.fetchMyProjects(projects));
      }
      dispatch(MetaAC.syncOperationFinished(result));
    })
    .catch((error) => {
      console.log(error);
      alert('Ocorreu um erro ao carregar os projetos!');
      dispatch(MetaAC.syncOperationFinished(error));
    });
};

export const createProject = (projeto, token) => (dispatch) => {
  const thenCallback = (result) => {
    dispatch(ProjectsAC.fetchProjectById(null));
    dispatch(MetaAC.syncOperationFinished(result));
    dispatch(loadProjects());
    if (result.status === 200) {
      browserHistory.push('/meusprojetos');
      alert('Projeto criado com sucesso!');
    }
  };

  const catchCallback = (error) => {
    alert('Não foi possível criar o projeto!');
    console.log('create project error: ', error);
    dispatch(MetaAC.syncOperationFinished(error));
  };

  dispatch(MetaAC.syncOperationLoading());
  projectsApi.newProject(projeto, token)
      .then(thenCallback)
      .catch(catchCallback);
};

export const loadProjectById = (id, token) => (dispatch) => {
  dispatch(MetaAC.syncOperationLoading());
  projectsApi.getProjectById(id, token)
    .then((result) => {
      if (result.status === 200) {
        const project = result.data;
        dispatch(ProjectsAC.fetchProjectById(project));
      }
      dispatch(MetaAC.syncOperationFinished(result));
    })
    .catch((error) => {
      console.log(error);
      alert('Ocorreu um erro ao carregar o projeto!');
      dispatch(MetaAC.syncOperationFinished(error));
    });
};

export const updateProject = (projeto, token) => (dispatch) => {
  const thenCallback = (result) => {
    dispatch(MetaAC.syncOperationFinished(result));
    if (result.status === 200) {
      dispatch(ProjectsAC.fetchProjectById(null));
      dispatch(loadMyProjects(result.data.usuarioId, token));
      browserHistory.push('/meusprojetos');
      alert('Projeto atualizado com sucesso!');
    }
  };

  const catchCallback = (error) => {
    alert('Não foi possível atualizar o projeto!');
    console.log('update project error: ', error);
    dispatch(MetaAC.syncOperationFinished(error));
  };

  dispatch(MetaAC.syncOperationLoading());
  projectsApi.updateProject(projeto, token)
      .then(thenCallback)
      .catch(catchCallback);
};
