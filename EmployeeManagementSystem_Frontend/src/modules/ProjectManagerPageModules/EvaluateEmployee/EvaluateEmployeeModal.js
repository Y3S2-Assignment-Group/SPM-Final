import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/EmployeeActions";

class EvaluateEmployeeModal extends Component {
  constructor(props) {
    super(props);
    this.calcualateTasksCount = this.calcualateTasksCount.bind(this);
    this.state = {
      totalTasks: 0,
      todoTaskCount: 0,
      inProgressTaskCount: 0,
      doneTaskCount: 0,
    };
  }

  componentDidMount() {
   this.props.fetchEmployeeById(this.props.employee._id, () => {
      this.calcualateTasksCount();
    });
  }

  calcualateTasksCount = () => {
    if (this.props.singleEmployee) {
      this.props.singleEmployee.projectsList.forEach((singleProject) => {
        if (singleProject._id === this.props.empProjectId) {
          singleProject.sprintList.forEach((singleSprint) => {
            this.setState({
              totalTasks:
                singleSprint.toDoList.length +
                singleSprint.inProgressList.length +
                singleSprint.doneList.length,
              todoTaskCount: singleSprint.toDoList.length,
              inProgressTaskCount: singleSprint.inProgressList.length,
              doneTaskCount: singleSprint.doneList.length,
            });
          });
        }
      });
    }
  };

  render() {
    return (
      <div>
        <div className="row mb-3">
          <div className="col-md-12 mb-3">
            <h6>Todo Tasks - {this.state.todoTaskCount}</h6>
            <div class="progress">
              <div
                class="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${this.state.totalTasks === 0 ? 0 : (this.state.todoTaskCount/this.state.totalTasks)*100}%` }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                { this.state.totalTasks === 0 ? 0 : (this.state.todoTaskCount / this.state.totalTasks ) * 100 } %
              </div>
            </div>
          </div>
          <div className="col-md-12 mb-3">
            <h6>Inprogress Tasks - {this.state.inProgressTaskCount }</h6>
            <div class="progress">
              <div
                class="progress-bar bg-warning"
                role="progressbar"
                style={{ width: `${this.state.totalTasks === 0 ? 0 : (this.state.inProgressTaskCount/this.state.totalTasks)*100}%` }}
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
              >{this.state.totalTasks === 0 ? 0 : (this.state.inProgressTaskCount / this.state.totalTasks ) * 100 } %</div>
            </div>
          </div>

          <div className="col-md-12 mb-3">
            <h6>Done Tasks - {this.state.doneTaskCount}</h6>
            <div class="progress">
              <div
                class="progress-bar bg-danger"
                role="progressbar"
                style={{ width: `${ this.state.totalTasks === 0 ? 0 : (this.state.doneTaskCount/this.state.totalTasks)*100}%` }}
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
              >{ this.state.totalTasks === 0 ? 0 : (this.state.doneTaskCount / this.state.totalTasks ) * 100 } %</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  singleEmployee: state.employeeReducer.singleEmployeeById,
});

const mapActionToProps = {
  fetchEmployeeById: actions.fetchEmployeeById,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(EvaluateEmployeeModal);
