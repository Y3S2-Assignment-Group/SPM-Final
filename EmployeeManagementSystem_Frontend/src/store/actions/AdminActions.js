import adminAPI from "../apis/AdminAPI";

export const ACTION_TYPES = {
  GET_ADMIN: "GET_ADMIN",
};

export const fetchAdmin = (OnSuccess) => (dispatch) => {
  adminAPI
    .authAdmin()
    .getAdminDetails()
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_ADMIN,
        payload: response.data,
      });
      OnSuccess();
    })
    .catch(() => {
    });
};
