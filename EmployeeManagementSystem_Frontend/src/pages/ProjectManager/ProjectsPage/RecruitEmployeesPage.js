import React, { Component } from "react";
import RecruitEmployeesTable from "../../../modules/ProjectManagerPageModules/RecruitEmployees/RecruitEmployeesTable";
import { connect } from "react-redux";
import * as empActions from "../../../store/actions/EmployeeActions";
import * as projectActions from "../../../store/actions/ProjectActions";

class RecruitEmployeesPage extends Component {

  componentDidMount(){
    this.props.fetchAllEmployeeList();
    this.props.fetchProjectById(this.props.match.params.projectid);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.singleProject !== nextProps.singleProject) {
      this.props.fetchProjectById(this.props.match.params.projectid);
    }
  }

  render() {
    return (
      <div className="container">
        {this.props.employeeList && this.props.singleProject ? <RecruitEmployeesTable projectId={this.props.match.params.projectid} employeeList={this.props.employeeList} empListInProject={this.props.singleProject.employeeList}/> : ""}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  employeeList: state.employeeReducer.employeeList,
  singleProject:state.projectReducer.singleProject
});

const mapActionToProps = {
  fetchAllEmployeeList: empActions.fetchAllEmployeeList,
  fetchProjectById:projectActions.fetchProjectById
};

export default connect(mapStateToProps, mapActionToProps)(RecruitEmployeesPage);