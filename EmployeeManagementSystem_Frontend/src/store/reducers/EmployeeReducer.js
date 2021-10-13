import { ACTION_TYPES } from "../actions/EmployeeActions";

const initialState = {
  singleEmployee: null,
  singleEmployeeById:null,
  employeeList: [],
  filterEmployeeList: [],
};

export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_EMPLOYEE:
      return {
        ...state,
        employeeList: [...state.employeeList, action.payload],
      };
    case ACTION_TYPES.GET_EMPLOYEE:
      return {
        ...state,
        singleEmployee: action.payload,
      };
    case ACTION_TYPES.GET_EMPLOYEE_BY_ID:
      return {
        ...state,
        singleEmployeeById: action.payload,
      };
    case ACTION_TYPES.GET_ALL_EMPLOYEES:
      return {
        ...state,
        employeeList: [...action.payload],
        filterEmployeeList: [...action.payload],
      };
    case ACTION_TYPES.DELETE_EMPLOYEE:
      return {
        ...state,
        employeeList: state.employeeList.filter(
          (x) => x._id !== action.payload
        ),
      };
    case ACTION_TYPES.UPDATE_EMPLOYEE:
      return {
        ...state,
        employeeList: state.employeeList.map((x) =>
          x._id === action.payload._id ? action.payload : x
        ),
      };
    case ACTION_TYPES.FETCH_FILTER_EMPLOYEES:
      return {
        ...state,
        filterEmployeeList: [...action.payload],
      };
    default:
      return state;
  }
};
