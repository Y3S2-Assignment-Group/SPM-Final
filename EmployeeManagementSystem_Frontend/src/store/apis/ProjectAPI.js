import axios from "axios";
import authHeader from "./authHeader";
const baseUrl = process.env.REACT_APP_BACKEND_URL;

const config = {
  headers: authHeader(),
};

const ProjectAPI = {
  apiProjectFunc() {
    return {
      fetchProjectById: (projectId) => axios.get(`${baseUrl}/api/project/${projectId}`),
      fetchAllProjectList: () => axios.get(`${baseUrl}/api/project/all`),
      deleteProject: (projectId) => axios.delete(`${baseUrl}/api/project/${projectId}`),
      addProject: (projectObj) => axios.post(`${baseUrl}/api/project`,projectObj),
      updateProject: (projectId,updateProjectObj) =>
      axios.put(`${baseUrl}/api/project/${projectId}`, updateProjectObj),
      addEmployeeToProject: (projectId,updateProjectObj) =>
      axios.put(`${baseUrl}/api/project/addemp/${projectId}`, updateProjectObj),
      addSprintToProject: (projectId,updateProjectObj) =>
      axios.put(`${baseUrl}/api/project/addsprint/${projectId}`, updateProjectObj),
    };
  },
};
export default ProjectAPI;
