import axios from "axios";
const baseUrl = process.env.REACT_APP_BACKEND_URL;

const SprintAPI = {
  apiSprintFunc() {
    return {
      createIssue: (sprintId, issueObj) =>
        axios.put(`${baseUrl}/api/sprint/createissue/${sprintId}`, issueObj),
      closeSprint: (sprintId) =>
        axios.put(`${baseUrl}/api/sprint/close/${sprintId}`),
      convertToDoToInProgress: (sprintId, issueObj ) =>
        axios.put(`${baseUrl}/api/sprint/${sprintId}/inprogress`, issueObj),
      convertInProgressToDone: (sprintId, issueObj) =>
        axios.put(`${baseUrl}/api/sprint/${sprintId}/done`, issueObj),
      addFeedback: (sprintId, feedbackObj ) =>
        axios.put(`${baseUrl}/api/sprint/addFeedback/${sprintId}`, feedbackObj),
    };
  },
};
export default SprintAPI;
