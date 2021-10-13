import axios from "axios";
import authHeader from "./authHeader";
const baseUrl = process.env.REACT_APP_BACKEND_URL;

const config = {
  headers: authHeader(),
};

const authProjectManagerApi = {
  authProjectManager() {
    return {
      confirmOutTime: (attendenceId, confirmOutTimeObj) =>
        axios.put(
          `${baseUrl}/api/projectmanager/confirmouttime/${attendenceId}`,
          confirmOutTimeObj
        ),
      confirmInTime: (projectManagerId, confirmInTimeObj) =>
        axios.put(
          `${baseUrl}/api/projectmanager/confirmintime/${projectManagerId}`,
          confirmInTimeObj
        ),
      fetchProjectManagerDetails: () =>
        axios.get(`${baseUrl}/api/projectmanager`, config),
      fetchAllProjectManagersList: () =>
        axios.get(`${baseUrl}/api/projectmanager/all`),
      updateProjectManager: (projectManagerId, updatedObject) =>
        axios.put(
          `${baseUrl}/api/projectmanager/updateprofile/${projectManagerId}`,
          updatedObject
        ),
      deleteProjectManager: (projectManagerId) =>
        axios.delete(`${baseUrl}/api/projectmanager/${projectManagerId}`),
      register: (newProjectManager) =>
        axios.post(`${baseUrl}/api/projectmanager/register`, newProjectManager),
      loginWithFaceAuth: (loginProjectManager) =>
        axios.post(`${baseUrl}/api/projectmanager/loginwithfaceauth`, loginProjectManager),
      login: (loginProjectManager) =>
        axios.post(`${baseUrl}/api/projectmanager/login`, loginProjectManager),
    };
  },
};
export default authProjectManagerApi;
