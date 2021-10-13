import { ACTION_TYPES } from "../actions/SprintActions";

const initialState = {
    issueList: [],
    singleIssue: null,
};
  

export const sprintReducer = (state = initialState, action) => {
    switch (action.type) {
      case ACTION_TYPES.CREATE_ISSUE:
        return {
          ...state,
        };
      case ACTION_TYPES.CLOSE_SPRINT:
        return {
          ...state,
        };
      case ACTION_TYPES.CONVERT_TODO_TO_INPROGRESS:
        return {
          ...state,
          ),
        };
      case ACTION_TYPES.CONVERT_INPROGRESS_TO_DONE:
        return {
          ...state,
        };
    case ACTION_TYPES.ADD_FEEDBACK:
        return {
          ...state,
        };
      default:
        return state;
    }
  };
  