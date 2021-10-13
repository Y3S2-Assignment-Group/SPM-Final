import axios from "axios";
import authHeader from "./authHeader";
const baseUrl = process.env.REACT_APP_BACKEND_URL;

const config = {
  headers: authHeader(),
};

const authEmployeeApi = {
  authEmployee() {
    return {
      loginWithFaceAuth: (loginEmployee) =>
      axios.post(`${baseUrl}/api/employee/loginwithfaceauth`, loginEmployee),
      confirmOutTime: (attendenceId,confirmOutTimeObj) => axios.put(`${baseUrl}/api/employee/confirmouttime/${attendenceId}`,confirmOutTimeObj),
      confirmInTime: (employeeId,confirmInTimeObj) => axios.put(`${baseUrl}/api/employee/confirmintime/${employeeId}`,confirmInTimeObj),
      getEmployeeDetails: () => axios.get(baseUrl + "/api/employee",config),
      getEmployeeDetailsById: (employeeId) => axios.get(`${baseUrl}/api/employee/${employeeId}`),
      fetchAllEmployeeList: () => axios.get(baseUrl + "/api/employee/all"),
      deleteEmployee: (employeeId) => axios.delete(baseUrl + "/api/employee/" +employeeId ),
      updateEmployee: (employeeId,updateEmployeeDetails) =>
      axios.put(`${baseUrl}/api/employee/updateprofile/${employeeId}`, updateEmployeeDetails),
      register: (newEmployee) =>
        axios.post(baseUrl + "/api/employee/register", newEmployee),
      login: (loginEmployee) =>
        axios.post(baseUrl + "/api/employee/login", loginEmployee),
    };
  },
};

export default authEmployeeApi;
