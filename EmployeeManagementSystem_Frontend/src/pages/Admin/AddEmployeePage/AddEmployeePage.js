import React, { Component } from "react";
import AddEmployeeForm from "../../../modules/AdminPageModules/AddEmployeeForm/AddEmployeeForm";
import EmployeeTable from "../../../modules/AdminPageModules/EmployeeTable/EmployeeTable";
import "./AddEmployeePage.css";

export default class AddEmployeePage extends Component {
  render() {
    return (
      <div className="container addEmployeePage">
        <h1 className="text-center mt-4 commonTextColor">EMPLOYEE MANAGEMENT</h1>
        <div className="row mt-4">
          <div className="col-lg-4 col-md-4">
            <AddEmployeeForm />
          </div>
          <div className="col-lg-8 col-md-8">
            <EmployeeTable />
            <br/>
            <br/>
          </div>
        </div>
      </div>
    );
  }
}
