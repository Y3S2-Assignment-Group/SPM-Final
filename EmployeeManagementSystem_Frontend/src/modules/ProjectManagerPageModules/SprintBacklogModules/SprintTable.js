import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/IssueActions";
import * as projectActions from "../../../store/actions/ProjectActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SprintTable.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import CreateIssueForm from "../CreateIssue/CreateIssueForm";
import FeedbackForm from "../Feedback/FeedbackForm/FeedbackForm";
import EditIssueForm from "../EditIssue/EditIssueForm";

class SprintTable extends Component {
  constructor(props) {
    super(props);

    this.toggleCreateIssue = this.toggleCreateIssue.bind(this);
    this.toggleEditIssue = this.toggleEditIssue.bind(this);
    this.toggleFeedbackForm = this.toggleFeedbackForm.bind(this);
    this.onDeleteIssue = this.onDeleteIssue.bind(this);

    this.state = {
      modalCreateIssue: false,
      modalEditIssue: false,
      modalFeedbackForm: false,
      sprintId: null,
      editIssueObj: null,
    };
  }

  toggleCreateIssue = () => {
    this.setState({ modalCreateIssue: !this.state.modalCreateIssue });
  };

  toggleEditIssue = () => {
    this.setState({ modalEditIssue: !this.state.modalEditIssue });
  };

  toggleFeedbackForm = () => {
    this.setState({ modalFeedbackForm: !this.state.modalFeedbackForm });
  };

  onDeleteIssue = (issueId) => {
    this.props.deleteIssue(
      issueId,
      () => {
        this.props.fetchProjectById(this.props.projectObj._id);
        toast.success("Issue Deleted", {
          autoClose: 2000,
        });
      },
      () => {
        toast.error("Something went wrong", {
          autoClose: 2000,
        });
      }
    );
  };

  render() {
    return (
      <div>
        {this.props.projectObj.sprintList.map((singleSprint) => {
          return (
            <div className="card mt-3 boderRadiusCards">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-9">
                    <h5>
                      {singleSprint.toDoList.length +
                        singleSprint.inProgressList.length +
                        singleSprint.doneList.length}{" "}
                      Issues
                    </h5>
                    <p className="text-muted">
                      {`${singleSprint.toDate.slice(
                        0,
                        10
                      )} - ${singleSprint.fromDate.slice(0, 10)}`}
                    </p>
                  </div>
                  <div className="col-md-3">
                    <button
                      className="btn sprintTableBtn"
                      onClick={() => {
                        this.setState({ sprintId: singleSprint._id });
                        this.toggleFeedbackForm();
                      }}
                    >
                      Feedback
                    </button>
                    <button className="btn sprintTableBtn">Analyze</button>
                    <button
                      className="btn sprintTableBtnPlus"
                      onClick={() => {
                        this.setState({ sprintId: singleSprint._id });
                        this.toggleCreateIssue();
                      }}
                      
                    >
                      <i class="bi bi-plus-circle-fill " ></i>
                    </button>
                  </div>

                  <hr />
                </div>
                <table className="table table-hover">
                  <tbody>
                    {/* toDoList List */}
                    {singleSprint.toDoList.map((issue) => {
                      return (
                        <tr>
                          <th scope="row">
                            <i class="bi bi-check-square-fill text-danger"></i>
                          </th>
                          <td>{issue.issueName}</td>
                          <td>{issue.assignee.name}</td>
                          <td>
                            <img
                              className="img-fluid rounded-circle employeeImage"
                              src={issue.assignee.profileImg}
                              alt="profile image1"
                            />
                          </td>
                          <td>
                            <button
                              className="btn btn-primary empTableBtn"
                              onClick={() => {
                                this.setState({ editIssueObj: issue });
                                this.toggleEditIssue();
                              }}
                            >
                              <i class="bi bi-gear-fill" ></i>
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger empTableBtn"
                              onClick={() => {
                                this.onDeleteIssue(issue._id);
                              }}
                            >
                              <i class="bi bi-trash-fill"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}

                    {/* In Progress List */}
                    {singleSprint.inProgressList.map((issue) => {
                      return (
                        <tr>
                          <th scope="row">
                            <i class="bi bi-check-square-fill text-warning"></i>
                          </th>
                          <td>{issue.issueName}</td>
                          <td>{issue.assignee.name}</td>
                          <td>
                            <img
                              className="img-fluid rounded-circle employeeImage"
                              src={issue.assignee.profileImg}
                              alt="profile image1"
                            />
                          </td>
                          <td>
                            <button
                              className="btn btn-primary empTableBtn"
                              onClick={() => {
                                this.setState({ editIssueObj: issue });
                                this.toggleEditIssue();
                              }}
                            >
                              <i class="bi bi-gear-fill"></i>
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger empTableBtn"
                              onClick={() => {
                                this.onDeleteIssue(issue._id);
                              }}
                            >
                              <i class="bi bi-trash-fill"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}

                    {/* Done List */}
                    {singleSprint.doneList.map((issue) => {
                      return (
                        <tr>
                          <th scope="row">
                            <i class="bi bi-check-square-fill text-success"></i>
                          </th>
                          <td>{issue.issueName}</td>
                          <td>{issue.assignee.name}</td>
                          <td>
                            <img
                              className="img-fluid rounded-circle employeeImage"
                              src={issue.assignee.profileImg}
                              alt="profile image1"
                            />
                          </td>
                          <td>
                            <button
                              className="btn btn-primary empTableBtn"
                              onClick={() => {
                                this.setState({ editIssueObj: issue });
                                this.toggleEditIssue();
                              }}
                            >
                              <i class="bi bi-gear-fill"></i>
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger empTableBtn"
                              onClick={() => {
                                this.onDeleteIssue(issue._id);
                              }}
                            >
                              <i class="bi bi-trash-fill"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Modals Section */}

              {/* Create Issue Modal */}
              <Modal
                isOpen={this.state.modalCreateIssue}
                toggle={this.toggleCreateIssue}
              >
                <ModalHeader toggle={this.toggleCreateIssue}>
                  Create Issue
                </ModalHeader>
                <ModalBody>
                  <CreateIssueForm
                    projectId={this.props.projectObj._id}
                    sprintId={this.state.sprintId}
                    assignedEmpList={this.props.projectObj.employeeList}
                  />
                </ModalBody>
              </Modal>

              {/* Edit Issue Modal */}
              <Modal
                isOpen={this.state.modalEditIssue}
                toggle={this.toggleEditIssue}
              >
                <ModalHeader toggle={this.toggleEditIssue}>
                  Edit Issue
                </ModalHeader>
                <ModalBody>
                  <EditIssueForm
                    projectId={this.props.projectObj._id}
                    editIssueObj={this.state.editIssueObj}
                  />
                </ModalBody>
              </Modal>

              {/* Create Feedback form Modal */}
              <Modal
                isOpen={this.state.modalFeedbackForm}
                toggle={this.toggleFeedbackForm}
              >
                <ModalHeader toggle={this.toggleFeedbackForm}>
                  Add Feedback
                </ModalHeader>
                <ModalBody>
                  <FeedbackForm
                    projectId={this.props.projectObj._id}
                    sprintId={this.state.sprintId}
                  />
                </ModalBody>
              </Modal>
              <ToastContainer />
              {/* End of Modals Section */}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapActionToProps = {
  deleteIssue: actions.deleteIssue,
  fetchProjectById: projectActions.fetchProjectById,
};

export default connect(null, mapActionToProps)(SprintTable);
