import sprintAPI from "../apis/SprintAPI";

export const ACTION_TYPES = {
  CREATE_ISSUE: "CREATE_ISSUE",
  CLOSE_SPRINT: "CLOSE_SPRINT",
  CONVERT_TODO_TO_INPROGRESS: "CONVERT_TODO_TO_INPROGRESS",
  CONVERT_INPROGRESS_TO_DONE: "CONVERT_INPROGRESS_TO_DONE",
  ADD_FEEDBACK: "ADD_FEEDBACK",
};

export const createIssue =
  (sprintId, issueObj, OnSuccess, OnFailure) => (dispatch) => {
    sprintAPI
      .apiSprintFunc()
      .createIssue(sprintId, issueObj)
      .then(() => {
        OnSuccess();
      })
      .catch(() => {
        OnFailure();
      });
  };

export const closeSprint = (sprintId, OnSuccess, OnFailure) => (dispatch) => {
  sprintAPI
    .apiSprintFunc()
    .closeSprint(sprintId)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.CLOSE_SPRINT,
        //TODO
        payload: response.data,
      });
      OnSuccess();
    })
    .catch(() => {
      OnFailure();
    });
};

export const convertToDoToInprogress =
  ( sprintId, issueObj, OnSuccess, OnFailure) => (dispatch) => {
    sprintAPI
      .apiSprintFunc()
      .convertToDoToInProgress(sprintId, issueObj)
      .then(() => {
        OnSuccess();
      })
      .catch(() => {
        OnFailure();
      });
  };

export const convertInprogressToDone =
  ( sprintId, issueObj, OnSuccess, OnFailure) => (dispatch) => {
    sprintAPI
      .apiSprintFunc()
      .convertInProgressToDone(sprintId, issueObj)
      .then(() => {
        OnSuccess();
      })
      .catch(() => {
        OnFailure();
      });
  };

export const addFeedback =
  (sprintId, feedbackObj, OnSuccess, OnFailure) => (dispatch) => {
    sprintAPI
      .apiSprintFunc()
      .addFeedback(sprintId, feedbackObj)
      .then(() => {
        OnSuccess();
      })
      .catch(() => {
        OnFailure();
      });
  };
