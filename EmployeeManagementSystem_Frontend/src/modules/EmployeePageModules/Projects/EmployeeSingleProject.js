import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/EmployeeActions";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import DoneTasks from "./DoneTasks";
import InProgressTasks from "./InProgressTasks";
import TodoTask from "./TodoTask";
import EmployeeFeedbackForm from "./EmployeeFeedbackForm";

class EmployeeSingleProject extends Component {
  constructor(props) {
    super(props);
    this.toggleFeedbackForm = this.toggleFeedbackForm.bind(this);
    this.state = {
      modalFeedbackForm: false,
      project: null,
    };
  }

  componentDidMount() {
    this.props.fetchEmployee(
      () => {
        const selectedProject = this.props.currentEmployee.projectsList.filter(
          (singleProj) => singleProj._id == this.props.match.params.projectid
        );
        this.setState({
          project: selectedProject[0],
        });
      },
      () => {}
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentEmployee !== nextProps.currentEmployee) {
      this.props.fetchEmployee(
        () => {
          const selectedProject =
            this.props.currentEmployee.projectsList.filter(
              (singleProj) =>
                singleProj._id == this.props.match.params.projectid
            );
          this.setState({
            project: selectedProject[0],
          });
        },
        () => {}
      );
    }
  }

  toggleFeedbackForm = () => {
    this.setState({ modalFeedbackForm: !this.state.modalFeedbackForm });
  };

  render() {
    return (
      <div>
        {this.props.currentEmployee && this.state.project ? (
          <div className="container">
            <div className="row mt-4 mb-2">
              <div className="col-md-12">
                <h1
                  className="text-left mb-4"
                  style={{ fontFamily: "Orbitron" }}
                >
                  {this.state.project.projectName}
                </h1>
                <h1
                  className="text-left mb-4"
                  style={{
                    fontFamily: "Orbitron",
                    fontSize: "15px",
                    color: "#808080",
                  }}
                >
                  {`Project Manager: ${this.state.project.projectManager.name}`}
                </h1>

                <button
                  className="btn sprintTableBtn  mb-3"
                  onClick={this.toggleFeedbackForm}
                >
                  ADD FEEDBACK
                </button>
              </div>
              {this.state.project.sprintList[0] ? (
                <>
                  <div className="col-md-4">
                    <TodoTask
                      sprintId={this.state.project.sprintList[0]._id}
                      toDoList={this.state.project.sprintList[0].toDoList}
                    />
                  </div>
                  <div className="col-md-4">
                    <InProgressTasks
                      sprintId={this.state.project.sprintList[0]._id}
                      inProgressList={
                        this.state.project.sprintList[0].inProgressList
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <DoneTasks
                      doneList={this.state.project.sprintList[0].doneList}
                    />
                  </div>
                </>
              ) : (
                <p>No Sprint</p>
              )}
            </div>
            {/* Modals Section */}
            {/* Create Feedback form Modal */}
            <Modal
              isOpen={this.state.modalFeedbackForm}
              toggle={this.toggleFeedbackForm}
            >
              <ModalHeader toggle={this.toggleFeedbackForm}>
                Add Employee Feedback
              </ModalHeader>
              <ModalBody>
                <EmployeeFeedbackForm
                  sprintId={this.state.project.sprintList[0]._id}
                />
              </ModalBody>
            </Modal>

            {/* End of Modals Section */}
          </div>
        ) : (
          <div className="loadingScreen">
            <div className="col-12 p-5">
              <center>
                <Loader
                  type="Grid"
                  color="#087E8B"
                  height={100}
                  width={100}
                  timeout={3000} //3 secs
                />
              </center>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentEmployee: state.employeeReducer.singleEmployee,
});

const mapActionToProps = {
  fetchEmployee: actions.fetchEmployee,
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(EmployeeSingleProject);
