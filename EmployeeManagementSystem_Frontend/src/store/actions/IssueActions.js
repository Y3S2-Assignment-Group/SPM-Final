import IssueApi from "../apis/IssueAPI";

export const ACTION_TYPES = {
  DELETE_ISSUE: "DELETE_ISSUE",
  EDIT_ISSUE: "EDIT_ISSUE",
  GETALLISSUELIST:"GETALLISSUELIST",
  GETISSUEBYID:"GETISSUEBYID",
};

export const deleteIssue = (issueId, OnSuccess, OnFailure) => (dispatch) => {
    IssueApi
        .issue()
        .deleteIssue(issueId)
        .then(()=>{
            dispatch({
                type:ACTION_TYPES.DELETE_ISSUE,
                //ToDo
                payload:issueId
            })
            OnSuccess();
        })
        .catch(() => {
            OnFailure();
        });
      
};

export const editIssue =  (issueId,issueObj,OnSuccess, OnFailure) =>  (dispatch) => {
   IssueApi
      .issue()
      .editIssue(issueId,issueObj)
      .then((res) => {
        dispatch({
          type: ACTION_TYPES.EDIT_ISSUE,
          payload: res.data,
        });
        OnSuccess();
      })
      .catch(() => { 
        OnFailure();
      });
  };

export const getAllIssuesList = (OnSuccess, OnFailure) => (dispatch) => {
    IssueApi
    .issue()
    .getAllIssueList()
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.GETALLISSUELIST,
        payload: res.data,
      });
      OnSuccess();
    })
    .catch(() => { 
      OnFailure();
    });
};

export const getIssueByID = (issueId, OnSuccess, OnFailure) => (dispatch) => {
    IssueApi
    .issue()
    .getIssuebyID(issueId)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GETISSUEBYID,
        payload: response.data,
      });
      OnSuccess();
    })
    .catch(() => { 
      OnFailure();
    });
};
