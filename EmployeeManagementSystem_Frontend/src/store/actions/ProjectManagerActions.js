import authProjectManagerApi from "../apis/ProjectManagerAPI";

export const ACTION_TYPES = {
  GET_PROJECT_MANAGER:"GET_PROJECT_MANAGER",
  GET_ALL_PROJECT_MANAGERS_LIST: "GET_ALL_PROJECT_MANAGERS_LIST",
  DELETE_PROJECT_MANAGER:"DELETE_PROJECT_MANAGER",
  UPDATE_PROJECT_MANAGER:"UPDATE_PROJECT_MANAGER",
  FETCH_FILTER_PROJECT_MANAGERS:"FETCH_FILTER_PROJECT_MANAGERS"
};

export const filterAllProjectManagers = (data) => (dispatch) => {
  console.log(data)
  dispatch({
    type: ACTION_TYPES.FETCH_FILTER_PROJECT_MANAGERS,
    payload: data,
  });
};

export const fetchProjectManagerDetails = () => (dispatch) => {
    authProjectManagerApi
    .authProjectManager()
    .fetchProjectManagerDetails()
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_PROJECT_MANAGER,
        payload: response.data,
      });
    })
    .catch(() => { });
};

export const fetchAllProjectManagersList = () => (dispatch) => {
    authProjectManagerApi
    .authProjectManager()
    .fetchAllProjectManagersList()
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_ALL_PROJECT_MANAGERS_LIST,
        payload: response.data,
      });
    })
    .catch(() => { });
};

export const deleteProjectManager = (projectManagerId ,OnSuccess, OnFailure) => (dispatch) => {
    authProjectManagerApi
    .authProjectManager()
    .deleteProjectManager(projectManagerId)
    .then(() => {
      dispatch({
        type: ACTION_TYPES.DELETE_PROJECT_MANAGER,
        payload: projectManagerId,
      });
      OnSuccess();
    })
    .catch(() => { 
      OnFailure();
    });
};

export const updateProjectManager = (projectManagerId, data, OnSuccess, OnFailure) => (dispatch) => {
    authProjectManagerApi
    .authProjectManager()
    .updateProjectManager(projectManagerId,data)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_PROJECT_MANAGER,
        payload: response.data,
      });
      OnSuccess();
    })
    .catch(() => { 
      OnFailure();
    });
};

export const confirmInTime =
(productManagerId, data, OnSuccess, OnFailure) => (dispatch) => {
  authProjectManagerApi
    .authProjectManager()
    .confirmInTime(productManagerId, data)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_PROJECT_MANAGER,
        payload: response.data,
      });
      OnSuccess();
    })
    .catch(() => {
      OnFailure();
    });
};

export const confirmOutTime =
(attendenceId, data, OnSuccess, OnFailure) => (dispatch) => {
  authProjectManagerApi
    .authProjectManager()
    .confirmOutTime(attendenceId, data)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_PROJECT_MANAGER,
        payload: response.data,
      });
      OnSuccess();
    })
    .catch(() => {
      OnFailure();
    });
};