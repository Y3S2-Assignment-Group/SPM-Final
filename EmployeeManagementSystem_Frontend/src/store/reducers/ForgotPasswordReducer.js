import { ACTION_TYPES } from "../actions/ForgotpasswordActions";

const initialState = {
  emailStatus:false,
};

export const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SEND_MAIL:
      return {
        ...state,
        emailStatus:true,
      };
    default:
      return state;
  }
};
