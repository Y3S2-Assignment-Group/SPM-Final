import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/EmployeeActions";
import "./SalaryManagementHeader.css";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

class SalaryManagementHeader extends Component {
  constructor(props) {
    super(props);
    this.onValueChange = this.onValueChange.bind(this);
    this.printDocument = this.printDocument.bind(this);
    this.checkEmployeeByName = this.checkEmployeeByName.bind(this);
    this.state = {
      name: "",
    };
  }

  async onValueChange(e) {
    await this.setState({ [e.target.name]: e.target.value });

    this.props.filterAllEmployees(
      this.props.employeeList.filter(this.checkEmployeeByName)
    );
  }

  checkEmployeeByName(list) {
    if (this.state.name !== "") {
      return list.name.toLowerCase().includes(this.state.name.toLowerCase());
    } else {
      return list;
    }
  }

  printDocument() {
    const doc = new jsPDF();
    var col = ["No", "Username", "Name", "Email", "Salary"];
    var rows = [];
    this.props.employeeList.forEach((element, index) => {
      var temp = [++index, element.username, element.name, element.email,element.salary];
      rows.push(temp);
    });

    doc.autoTable(col, rows, { startY: 10 });
    doc.save("SalaryManagementReport.pdf");
  }

  render() {
    return (
      <div>
        <div className="row mt-5 SalaryManagementHeader">
          <div className="col-md-7 p-2">
            <h3>SALARY MANAGEMENT</h3>
          </div>
          <div className="col-md-3 p-2">
            <div class="searchTab">
              <input
                type="text"
                placeholder="Search by name.."
                name="name"
                onChange={(e) => {
                  this.onValueChange(e);
                }}
              />
              <button type="submit">
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>
          <div className="col-md-2 p-2">
            <button className="btn empProjectTableBtn" onClick={this.printDocument}>Generate Report</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  employeeList: state.employeeReducer.employeeList,
});

const mapActionToProps = {
  filterAllEmployees: actions.filterAllEmployees,
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(SalaryManagementHeader);
