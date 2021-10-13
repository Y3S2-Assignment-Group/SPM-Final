import { ACTION_TYPES } from "../actions/ProjectActions";

const initialState = {
  projectList: [],
  filterProjectList:[],
  singleProject: null,
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_PROJECT:
      return {
        ...state,
        projectList: [...state.projectList, action.payload],
      };
    case ACTION_TYPES.GET_SINGLE_PROJECT:
      return {
        ...state,
        singleProject: action.payload,
      };
    case ACTION_TYPES.GET_ALL_PROJECTS:
      return {
        ...state,
        projectList: [...action.payload],
        filterProjectList: [...action.payload],
      };
    case ACTION_TYPES.DELETE_PROJECT:
      return {
        ...state,
        projectList: state.projectList.filter((x) => x._id !== action.payload),
      };
    case ACTION_TYPES.UPDATE_PROJECT:
      return {
        ...state,
        projectList: state.projectList.map((x) =>
          x._id === action.payload._id ? action.payload : x
        ),
      };
      case ACTION_TYPES.FETCH_FILTER_PROJECTS:
        return {
          ...state,
          filterProjectList: [...action.payload],
        };
    default:
      return state;
  }
};
