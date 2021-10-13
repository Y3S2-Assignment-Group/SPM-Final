import axios from "axios";
import authHeader from "./authHeader";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const config = {
    headers: authHeader(),
  };

const authAdminApi = {
    authAdmin() {
        return {
            getAdminDetails: () => axios.get(baseUrl + "/api/admin",config),
            register: (newAdmin) =>
                axios.post(baseUrl + "/api/admin/register", newAdmin),
            login: (loginAdmin) => axios.post(baseUrl + "/api/admin/login", loginAdmin),
        };
    },
};
export default authAdminApi;
