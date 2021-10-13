import axios from "axios";
const baseUrl = process.env.REACT_APP_BACKEND_URL;

const ForgotPasswordApi = {
  forgotPassword() {
    return {
        sendMailToReset: (email) => axios.post(baseUrl + "/api/forgotpassword/emp" ,email),
        resetEmpPW: (resetObj) => axios.put(`${baseUrl}/api/forgotpassword/resetemppwd `,resetObj),
        resetPmPW: (resetObj) => axios.put(`${baseUrl}/api/forgotpassword/resetpmpwd `,resetObj),
        resetAdminPW: (resetObj) => axios.put(`${baseUrl}/api/forgotpassword/resetadminpwd `,resetObj),
    };
  },
};
export default ForgotPasswordApi;
