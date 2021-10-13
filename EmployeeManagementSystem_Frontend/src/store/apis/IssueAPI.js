import axios from "axios";
const baseUrl = process.env.REACT_APP_BACKEND_URL;

const IssueApi = {
  issue() {
    return {
        deleteIssue: (issueId) => axios.delete(baseUrl + "/api/issue/" +issueId ),
        editIssue: (issueId,issueObj) => axios.put(`${baseUrl}/api/issue/${issueId}`,issueObj),
        getAllIssueList: () => axios.get(baseUrl + "/api/issue/all"),
        getIssuebyID: (issueId) => axios.get(baseUrl + "/api/issue/"+issueId),
    };
  },
};
export default IssueApi;
