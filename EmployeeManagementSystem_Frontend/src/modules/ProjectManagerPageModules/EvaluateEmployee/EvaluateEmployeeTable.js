import React, { Component } from "react";
import { connect } from "react-redux";
import * as projectActions from "../../../store/actions/ProjectActions";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import EvaluateEmployeeModal from "./EvaluateEmployeeModal";

class EvaluateEmployeeTable extends Component {
  constructor(props) {
    super(props);
    this.toggleEvaluateEmployee = this.toggleEvaluateEmployee.bind(this);
    this.state = {
      projectId:this.props.projectId,
      employee: null,
      existEmpArray: [],
      modalEvaluateEmployee: false,
    };
  }

  componentDidMount() {
    let localArray = [];
    this.props.empListInProject.map((employee) => {
      localArray.push(employee._id);
    });
    this.setState({ existEmpArray: localArray });
  }

  toggleEvaluateEmployee = () => {
    this.setState({
      modalEvaluateEmployee: !this.state.modalEvaluateEmployee,
    });
  };

  render() {
    return (
      <div>
        <div className="row mt-5 mb-5">
          <h1 className="text-center">Recruit Employees</h1>
          <div className="col-md-12 mt-2">
            <div className="card mt-3 boderRadiusCards">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <h5>Development</h5>
                  </div>
                </div>
                <table className="table table-hover">
                  <tbody>
                    {this.props.employeeList.map((employee, index) => {
                      if (
                        this.state.existEmpArray.includes(employee._id) &&
                        employee.department === "Development"
                      ) {
                        return (
                          <tr>
                            <td className="tableDataWidth">{++index}</td>
                            <td className="tableDataWidth">
                              {employee.username}
                            </td>
                            <td className="tableDataWidth">{employee.name}</td>
                            <td className="tableDataWidth">
                              <button
                                className="mt-2 modalCreateBtn"
                                onClick={async () => {
                                  await this.setState({ employee: employee });
                                  this.toggleEvaluateEmployee();
                                }}
                              >
                                Generate Report
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-2">
            <div className="card mt-3 boderRadiusCards">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <h5>Marketing</h5>
                  </div>
                </div>
                <table className="table table-hover">
                  <tbody>
                    {this.props.employeeList.map((employee, index) => {
                      if (
                        this.state.existEmpArray.includes(employee._id) &&
                        employee.department === "Marketing"
                      ) {
                        return (
                          <tr>
                            <td className="tableDataWidth">{++index}</td>
                            <td className="tableDataWidth">
                              {employee.username}
                            </td>
                            <td className="tableDataWidth">{employee.name}</td>
                            <td className="tableDataWidth">
                              <button
                                className="mt-2 modalCreateBtn"
                                onClick={async () => {
                                  await this.setState({ employee: employee });
                                  this.toggleEvaluateEmployee();
                                }}
                              >
                                Generate Report
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-2">
            <div className="card mt-3 boderRadiusCards">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <h5>Quality Assurance</h5>
                  </div>
                </div>
                <table className="table table-hover">
                  <tbody>
                    {this.props.employeeList.map((employee, index) => {
                      if (
                        this.state.existEmpArray.includes(employee._id) &&
                        employee.department === "Quality Assurance"
                      ) {
                        return (
                          <tr>
                            <td className="tableDataWidth">{++index}</td>
                            <td className="tableDataWidth">
                              {employee.username}
                            </td>
                            <td className="tableDataWidth">{employee.name}</td>
                            <td className="tableDataWidth">
                              <button
                                className="mt-2 modalCreateBtn"
                                onClick={async () => {
                                  await this.setState({ employee: employee });
                                  this.toggleEvaluateEmployee();
                                }}
                              >
                                Generate Report
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* Modals Section */}

        {/* Evaluate Employee*/}
        <Modal
          isOpen={this.state.modalEvaluateEmployee}
          toggle={this.toggleEvaluateEmployee}
        >
          <ModalHeader toggle={this.toggleEvaluateEmployee}>
            Evaluate Employee
          </ModalHeader>
          <ModalBody>
            <EvaluateEmployeeModal employee={this.state.employee} empProjectId={this.state.projectId} />
          </ModalBody>
        </Modal>

        {/* End of Modals Section */}
      </div>
    );
  }
}

const mapActionToProps = {
  addEmployeeToProject: projectActions.addEmployeeToProject,
  fetchProjectById: projectActions.fetchProjectById,
};

export default connect(null, mapActionToProps)(EvaluateEmployeeTable);
