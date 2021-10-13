import ProjectAPI from "../apis/ProjectAPI";

export const ACTION_TYPES = {
  ADD_PROJECT: "ADD_PROJECT",
  GET_SINGLE_PROJECT:"GET_SINGLE_PROJECT",
  GET_ALL_PROJECTS: "GET_ALL_PROJECTS",
  DELETE_PROJECT:"DELETE_PROJECT",
  UPDATE_PROJECT:"UPDATE_PROJECT",
  FETCH_FILTER_PROJECTS:"FETCH_FILTER_PROJECTS"
};

export const filterAllProjects = (data) => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.FETCH_FILTER_PROJECTS,
    payload: data,
  });
};

export const addProject = (data, OnSuccess, OnFailure) => (dispatch) => {
    ProjectAPI
    .apiProjectFunc()
    .addProject(data)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.ADD_PROJECT,
        payload: response.data,
      });
      OnSuccess();
    })
    .catch(() => {
      OnFailure();
    });
};

export const fetchProjectById = (projectId) => (dispatch) => {
    ProjectAPI
    .apiProjectFunc()
    .fetchProjectById(projectId)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_SINGLE_PROJECT,
        payload: response.data,
      });
    })
    .catch(() => { });
};

export const fetchAllProjectList = () => (dispatch) => {
    ProjectAPI
    .apiProjectFunc()
    .fetchAllProjectList()
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_ALL_PROJECTS,
        payload: response.data,
      });
    })
    .catch(() => { });
};

export const deleteProject = (projectId ,OnSuccess, OnFailure) => (dispatch) => {
    ProjectAPI
    .apiProjectFunc()
    .deleteProject(projectId)
    .then(() => {
      dispatch({
        type: ACTION_TYPES.DELETE_PROJECT,
        payload: projectId,
      });
      OnSuccess();
    })
    .catch(() => { 
      OnFailure();
    });
};

export const updateProject = (projectId, data, OnSuccess, OnFailure) => (dispatch) => {
    ProjectAPI
    .apiProjectFunc()
    .updateProject(projectId,data)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_PROJECT,
        payload: response.data,
      });
      OnSuccess();
    })
    .catch(() => { 
      OnFailure();
    });
};

export const addEmployeeToProject = (projectId, data, OnSuccess, OnFailure) => (dispatch) => {
    ProjectAPI
    .apiProjectFunc()
    .addEmployeeToProject(projectId,data)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_PROJECT,
        payload: response.data,
      });
      OnSuccess();
    })
    .catch(() => { 
      OnFailure();
    });
};

export const addSprintToProject = (projectId, data, OnSuccess, OnFailure) => (dispatch) => {
    ProjectAPI
    .apiProjectFunc()
    .addSprintToProject(projectId,data)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_PROJECT,
        payload: response.data,
      });
      OnSuccess();
    })
    .catch(() => { 
      OnFailure();
    });
};