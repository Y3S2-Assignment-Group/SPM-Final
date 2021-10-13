import React, { Component } from "react";
import SalaryManagementHeader from "../../../modules/AdminPageModules/SalaryManagement/SalaryManagementHeader";
import SalaryManagementTable from "../../../modules/AdminPageModules/SalaryManagement/SalaryManagementTable";

export default class AdminSalaryManagementPage extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <SalaryManagementHeader />
          </div>
          <div className="col-md-12">
            <SalaryManagementTable />
          </div>
        </div>
      </div>
    );
  }
}
