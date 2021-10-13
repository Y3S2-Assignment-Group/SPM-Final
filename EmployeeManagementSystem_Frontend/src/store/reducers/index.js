import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import {employeeReducer} from "./EmployeeReducer";
import {projectReducer} from "./ProjectReducer";
import {AdminReducer} from "./AdminReducer";
import {projectManagerReducer} from "./ProjectManagerReducer";
import {issueReducer} from "./IssueReducer";


export const reducers = combineReducers({
  authReducer,
  employeeReducer,
  projectReducer,
  projectManagerReducer,
  issueReducer,
  AdminReducer
});
