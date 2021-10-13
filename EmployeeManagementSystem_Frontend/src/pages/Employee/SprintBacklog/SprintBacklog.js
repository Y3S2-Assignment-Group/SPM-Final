import React, { Component } from "react";
import SprintBacklogHeader from "../../../modules/EmployeePageModules/SprintBacklogModules/SprintBacklogHeader";
import SprintTable from "../../../modules/EmployeePageModules/SprintBacklogModules/SprintTable";

export default class SprintBacklog extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12"><SprintBacklogHeader/></div>
          <div className="col-lg-12"><SprintTable/></div>
        </div>
      </div>
    );
  }
}
