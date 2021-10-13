import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/ProjectActions";
import "./ProjectTableHeader.css";

class ProjectTableHeader extends Component {
  constructor(props) {
    super(props);
    this.onValueChange = this.onValueChange.bind(this);
    this.checkProjectByName = this.checkProjectByName.bind(this);
    this.state = {
      projectName: "",
    };
  }

  async onValueChange(e) {
    await this.setState({ [e.target.name]: e.target.value });
    this.props.filterAllProjects(
      this.props.projectList.filter(this.checkProjectByName)
    );
  }

  checkProjectByName(list) {
    if (this.state.projectName !== "") {
      return list.projectName
        .toLowerCase()
        .includes(this.state.projectName.toLowerCase());
    } else {
      return list;
    }
  }

  render() {
    return (
      <div>
        <div className="row SalaryManagementHeader">
          <div className="col-md-9 p-2">
            <div class="searchTab">
              <input
                type="text"
                placeholder="Search by project name.."
                name="projectName"
                onChange={(e) => {
                  this.onValueChange(e);
                }}
              />
              <button type="submit">
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  projectList: state.projectReducer.projectList,
});

const mapActionToProps = {
  filterAllProjects: actions.filterAllProjects,
};
export default connect(mapStateToProps, mapActionToProps)(ProjectTableHeader);
