import ForgotPasswordApi  from "../apis/ForgotPasswordAPI";

export const ACTION_TYPES = {
  SEND_MAIL: "SEND_MAIL",
  RESET_EMP_PW: "RESET_EMP_PW",
  RESET_PM_PW:"RESET_PM_PW",
  RESET_ADMIN_pW:"RESET_ADMIN_pW",
};

export const sendResetMail = (email, OnSuccess, OnFailure) => (dispatch) => {
   console.log(email)
    ForgotPasswordApi
        .forgotPassword()
        .sendMailToReset(email)
        .then(()=>{
          dispatch({
            type:ACTION_TYPES.SEND_MAIL,
        })
            OnSuccess();
        })
        .catch(() => {
            OnFailure();
        });
      
};

export const resetEmployeePassword = (resetObj,OnSuccess, OnFailure) => (dispatch) => {
    ForgotPasswordApi
      .forgotPassword()
      .resetEmpPW(resetObj)
      .then(() => {
        OnSuccess();
      })
      .catch(() => { 
        OnFailure();
      });
  };

export const resetProjectManagerPassword = (resetObj,OnSuccess, OnFailure) => (dispatch) => {
    ForgotPasswordApi
    .forgotPassword()
    .resetPmPW(resetObj)
    .then(() => {
      OnSuccess();
    })
    .catch(() => { 
      OnFailure();
    });
};

export const resetAdminPassword = (resetObj, OnSuccess, OnFailure) => (dispatch) => {
    ForgotPasswordApi
    .forgotPassword()
    .resetAdminPW(resetObj)
    .then(() => {
      OnSuccess();
    })
    .catch(() => { 
      OnFailure();
    });
};
