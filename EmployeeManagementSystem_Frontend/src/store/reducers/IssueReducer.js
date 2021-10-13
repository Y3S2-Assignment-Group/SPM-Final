import { ACTION_TYPES } from "../actions/IssueActions";

const initialState = {
    issueList: [],
    singleIssue: null,
};
  

export const issueReducer = (state = initialState, action) => {
    switch (action.type) {
      case ACTION_TYPES.DELETE_ISSUE:
        return {
          ...state,
          issueList: state.issueList.filter(
            (x) => x._id !== action.payload
          ),
        };
      case ACTION_TYPES.EDIT_ISSUE:
        return {
          ...state,
          issueList: state.issueList.map((x) =>
            x._id === action.payload._id ? action.payload : x
          ),
        };
      case ACTION_TYPES.GETALLISSUELIST:
        return {
          ...state,
          issueList: [...action.payload],
        };
      case ACTION_TYPES.GETISSUEBYID:
        return {
          ...state,
          singleIssue: action.payload,
        };
      default:
        return state;
    }
  };
  