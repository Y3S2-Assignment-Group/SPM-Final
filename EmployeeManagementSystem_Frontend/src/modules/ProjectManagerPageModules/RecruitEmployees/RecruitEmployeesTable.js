import React, { Component } from "react";
import { connect } from "react-redux";
import * as projectActions from "../../../store/actions/ProjectActions";
import "./RecruitEmployeesTable.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class RecruitEmployeesTable extends Component {
  constructor(props) {
    super(props);
    this.OnAddEmployeeToProject = this.OnAddEmployeeToProject.bind(this);
    this.state = {
      existEmpArray: [],
    };
  }

  componentDidMount() {
    let localArray = [];
    this.props.empListInProject.map((employee) => {
      localArray.push(employee._id);
    });
    this.setState({ existEmpArray: localArray });
  }

  async OnAddEmployeeToProject(empId) {
    const employeeObj = {
      employee: {
        _id: empId,
      },
    };
    await this.props.addEmployeeToProject(
      this.props.projectId,
      employeeObj,
      async () => {
        await toast.success("Recruit employee", {
          autoClose: 2500,
        });
        window.location = `/projectdashboard/${this.props.projectId}/addmemberproject`;
      },
      () => {
        toast.error("Something went wrong", {
          autoClose: 2500,
        });
      }
    );
  }

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
                      if (employee.department === "Development") {
                        return (
                          <tr>
                            <td className="tableDataWidth">{++index}</td>
                            <td className="tableDataWidth">
                              {employee.username}
                            </td>
                            <td className="tableDataWidth">{employee.name}</td>
                            <td className="tableDataWidth">
                              {this.state.existEmpArray.includes(
                                employee._id
                              ) ? (
                                <button className="btn tableDataBtn empTableBtn">
                                  <i class="bi bi-dash-lg"></i>
                                </button>
                              ) : (
                                <button
                                  className="btn tableDataBtn empTableBtn"
                                  onClick={() => {
                                    this.OnAddEmployeeToProject(employee._id);
                                  }}
                                >
                                  <i class="bi bi-plus-lg"></i>
                                </button>
                              )}
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
                      if (employee.department === "Marketing") {
                        return (
                          <tr>
                            <td className="tableDataWidth">{++index}</td>
                            <td className="tableDataWidth">
                              {employee.username}
                            </td>
                            <td className="tableDataWidth">{employee.name}</td>
                            <td className="tableDataWidth">
                              {this.state.existEmpArray.includes(
                                employee._id
                              ) ? (
                                <button className="btn tableDataBtn empTableBtn">
                                  <i class="bi bi-dash-lg"></i>
                                </button>
                              ) : (
                                <button
                                  className="btn tableDataBtn empTableBtn"
                                  onClick={() => {
                                    this.OnAddEmployeeToProject(employee._id);
                                  }}
                                >
                                  <i class="bi bi-plus-lg"></i>
                                </button>
                              )}
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
                      if (employee.department === "Quality Assurance") {
                        return (
                          <tr>
                            <td className="tableDataWidth">{++index}</td>
                            <td className="tableDataWidth">
                              {employee.username}
                            </td>
                            <td className="tableDataWidth">{employee.name}</td>
                            <td className="tableDataWidth">
                              {this.state.existEmpArray.includes(
                                employee._id
                              ) ? (
                                <button className="btn tableDataBtn empTableBtn">
                                  <i class="bi bi-dash-lg"></i>
                                </button>
                              ) : (
                                <button
                                  className="btn tableDataBtn empTableBtn"
                                  onClick={() => {
                                    this.OnAddEmployeeToProject(employee._id);
                                  }}
                                >
                                  <i class="bi bi-plus-lg"></i>
                                </button>
                              )}
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
        <ToastContainer />
      </div>
    );
  }
}

const mapActionToProps = {
  addEmployeeToProject: projectActions.addEmployeeToProject,
  fetchProjectById: projectActions.fetchProjectById,
};

export default connect(null, mapActionToProps)(RecruitEmployeesTable);
