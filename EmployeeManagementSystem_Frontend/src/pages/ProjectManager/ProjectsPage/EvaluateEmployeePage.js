import React, { Component } from "react";
import EvaluateEmployeeTable from "../../../modules/ProjectManagerPageModules/EvaluateEmployee/EvaluateEmployeeTable";
import { connect } from "react-redux";
import * as empActions from "../../../store/actions/EmployeeActions";
import * as projectActions from "../../../store/actions/ProjectActions";

class EvaluateEmployeePage extends Component {
  componentDidMount() {
    this.props.fetchAllEmployeeList();
    this.props.fetchProjectById(this.props.match.params.projectid);
  }
  render() {
    return (
      <div className="container">
        {this.props.employeeList && this.props.singleProject ? (
          <EvaluateEmployeeTable
            projectId={this.props.match.params.projectid}
            employeeList={this.props.employeeList}
            empListInProject={this.props.singleProject.employeeList}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  employeeList: state.employeeReducer.employeeList,
  singleProject: state.projectReducer.singleProject,
});

const mapActionToProps = {
  fetchAllEmployeeList: empActions.fetchAllEmployeeList,
  fetchProjectById: projectActions.fetchProjectById,
};

export default connect(mapStateToProps, mapActionToProps)(EvaluateEmployeePage);
