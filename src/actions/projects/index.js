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
      dispatch(MetaAC.syncOperationFinished(error));
    });
};

export const loadMyProjects = (id) => (dispatch) => {
  dispatch(MetaAC.syncOperationLoading());
  projectsApi.getMyProjects(id)
    .then((result) => {
      const projects = result.data;
      dispatch(ProjectsAC.fetchMyProjects(projects));
      dispatch(MetaAC.syncOperationFinished(result));
    })
    .catch((error) => {
      console.log(error);
      alert('Ocorreu um erro ao carregar os projetos!');
      dispatch(MetaAC.syncOperationFinished(error));
    });
};

export const createProject = (projeto) => (dispatch) => {
  const thenCallback = (result) => {
    dispatch(MetaAC.syncOperationFinished(result));
    dispatch(loadProjects());
    if (result.status === 200) {
      alert('Projeto criado com sucesso!');
    }
  };

  const catchCallback = (error) => {
    alert('Não foi possível criar o projeto!');
    console.log('create project error: ', error);
    dispatch(MetaAC.syncOperationFinished(error));
  };

  dispatch(MetaAC.syncOperationLoading());
  projectsApi.newProject(projeto)
      .then(thenCallback)
      .catch(catchCallback);
};

export const loadProjectById = (id) => (dispatch) => {
  dispatch(MetaAC.syncOperationLoading());
  projectsApi.getProjectById(id)
    .then((result) => {
      const project = result.data;
      dispatch(ProjectsAC.fetchProjectById(project));
      dispatch(MetaAC.syncOperationFinished(result));
    })
    .catch((error) => {
      console.log(error);
      alert('Ocorreu um erro ao carregar o projeto!');
      dispatch(MetaAC.syncOperationFinished(error));
    });
};

export const updateProject = (projeto) => (dispatch) => {
  const thenCallback = (result) => {
    dispatch(MetaAC.syncOperationFinished(result));
    dispatch(loadProjectById(projeto.id));
    if (result.status === 200) {
      alert('Projeto atualizado com sucesso!');
    }
  };

  const catchCallback = (error) => {
    alert('Não foi possível atualizar o projeto!');
    console.log('update project error: ', error);
    dispatch(MetaAC.syncOperationFinished(error));
  };

  dispatch(MetaAC.syncOperationLoading());
  projectsApi.updateProject(projeto)
      .then(thenCallback)
      .catch(catchCallback);
};
