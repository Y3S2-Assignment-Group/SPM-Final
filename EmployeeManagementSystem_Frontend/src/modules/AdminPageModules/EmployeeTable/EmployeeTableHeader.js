import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/EmployeeActions";
import "./EmployeeTableHeader.css"
import { jsPDF } from "jspdf";
import "jspdf-autotable";

class EmployeeTableHeader extends Component {
  constructor(props) {
    super(props);
    this.onValueChange = this.onValueChange.bind(this);
    this.checkEmployeeByName = this.checkEmployeeByName.bind(this);
    this.printDocument = this.printDocument.bind(this);
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
    var col = ["No", "Username", "Name", "Email"];
    var rows = [];
    this.props.employeeList.forEach((element, index) => {
      var temp = [++index, element.username, element.name, element.email];
      rows.push(temp);
    });

    doc.autoTable(col, rows, { startY: 10 });
    doc.save("EmployeeReport.pdf");
  }

  render() {
    return (
      <div>
        <div className="row SalaryManagementHeader">
          <div className="col-md-9 p-2">
            <div class="searchTab">
            <input
                type="text"
                placeholder="Search by name.."
                name="name"
                onChange={(e) => {
                  this.onValueChange(e);
                }}
              />
            </div>
          </div>
          <div className="col-md-3 p-2">
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
)(EmployeeTableHeader);
