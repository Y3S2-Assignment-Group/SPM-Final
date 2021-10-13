import employeeAPI from "../apis/EmployeeAPI";

export const ACTION_TYPES = {
  ADD_EMPLOYEE: "ADD_EMPLOYEE",
  GET_EMPLOYEE: "GET_EMPLOYEE",
  GET_EMPLOYEE_BY_ID:"GET_EMPLOYEE_BY_ID",
  GET_ALL_EMPLOYEES: "GET_ALL_EMPLOYEES",
  DELETE_EMPLOYEE: "DELETE_EMPLOYEE",
  UPDATE_EMPLOYEE: "UPDATE_EMPLOYEE",
  FETCH_FILTER_EMPLOYEES:"FETCH_FILTER_EMPLOYEES"
};

export const filterAllEmployees = (data) => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.FETCH_FILTER_EMPLOYEES,
    payload: data,
  });
};

export const employeeRegister = (data, OnSuccess, OnFailure) => (dispatch) => {
  employeeAPI
    .authEmployee()
    .register(data)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.ADD_EMPLOYEE,
        payload: response.data,
      });
      OnSuccess();
    })
    .catch(() => {
      OnFailure();
    });
};

export const fetchEmployee = (OnSuccess) => (dispatch) => {
  employeeAPI
    .authEmployee()
    .getEmployeeDetails()
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_EMPLOYEE,
        payload: response.data,
      });
      OnSuccess();
    })
    .catch(() => {
    });
};

export const fetchEmployeeById = (employeeId, OnSuccess) => (dispatch) => {
  employeeAPI
    .authEmployee()
    .getEmployeeDetailsById(employeeId)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_EMPLOYEE_BY_ID,
        payload: response.data,
      });
      OnSuccess()
    })
    .catch(() => {
    });
};

export const fetchAllEmployeeList = () => (dispatch) => {
  employeeAPI
    .authEmployee()
    .fetchAllEmployeeList()
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_ALL_EMPLOYEES,
        payload: response.data,
      });
    })
    .catch(() => {});
};

export const deleteEmployee =
  (employeeId, OnSuccess, OnFailure) => (dispatch) => {
    employeeAPI
      .authEmployee()
      .deleteEmployee(employeeId)
      .then(() => {
        dispatch({
          type: ACTION_TYPES.DELETE_EMPLOYEE,
          payload: employeeId,
        });
        OnSuccess();
      })
      .catch(() => {
        OnFailure();
      });
  };

export const updateEmployee =
  (employeeId, data, OnSuccess, OnFailure) => (dispatch) => {
    employeeAPI
      .authEmployee()
      .updateEmployee(employeeId, data)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.UPDATE_EMPLOYEE,
          payload: response.data,
        });
        OnSuccess();
      })
      .catch(() => {
        OnFailure();
      });
  };


  export const confirmInTime =
  (employeeId, data, OnSuccess, OnFailure) => (dispatch) => {
    console.log("employe action ",employeeId,data)
    employeeAPI
      .authEmployee()
      .confirmInTime(employeeId, data)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.UPDATE_EMPLOYEE,
          payload: response.data,
        });
        OnSuccess();
      })
      .catch(() => {
        OnFailure();
      });
  };

  export const confirmOutTime =
  (attendenceId, data, OnSuccess, OnFailure) => (dispatch) => {
    console.log("employe action ",attendenceId,data)
    employeeAPI
      .authEmployee()
      .confirmOutTime(attendenceId, data)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.UPDATE_EMPLOYEE,
          payload: response.data,
        });
        OnSuccess();
      })
      .catch(() => {
        OnFailure();
      });
  };