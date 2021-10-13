import { ACTION_TYPES } from "../actions/AdminActions";

const initialState = {
  singleAdmin:null,
};

export const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_ADMIN:
      return {
        ...state,
        singleAdmin: action.payload
      };
    default:
      return state;
  }
};
