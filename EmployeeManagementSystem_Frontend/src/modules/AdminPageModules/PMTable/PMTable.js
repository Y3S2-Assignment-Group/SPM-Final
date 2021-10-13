import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/ProjectManagerActions";
import "./PMTable.css";
import ProfileImage from "../../../assets/images/profile.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import PMTableHeader from "./PMTableHeader";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

class PMTable extends Component {
  constructor(props) {
    super(props);
    this.onRemoveEmployee = this.onRemoveEmployee.bind(this);
    this.printDocument = this.printDocument.bind(this);
    this.state = {
      modalEditEmployee: false,
      singleEmployeeObject: null,
    };
  }

  componentDidMount() {
    this.props.fetchAllProjectManagersList();
  }

  onRemoveEmployee(employeeId) {
    this.props.deleteProjectManager(
      employeeId,
      () => {
        toast.success("Project Manager delete Success", {
          autoClose: 1000,
        });
      },
      () => {
        toast.error("Something went wrong", {
          autoClose: 1000,
        });
      }
    );
  }

  printDocument() {
    const doc = new jsPDF();
    var col = ["No", "Username", "Name", "Email"];
    var rows = [];
    this.props.filterProjectManagersList.forEach((element, index) => {
      var temp = [++index, element.username, element.name, element.email];
      rows.push(temp);
    });

    doc.autoTable(col, rows, { startY: 10 });
    doc.save("ProjectManagerReport.pdf");
  }

  render() {
    return (
      <div className="container">
        <div
          className="text-center mt-5"
          style={{ fontFamily: "Orbitron", fontSize: "20px", color: "grey" }}
        >
          <span className="display-1">PROJECT MANAGER LIST</span>
        </div>
        <div className="card boderRadiusCards shadow-none" id="divToPrint">
          <div className="card-body empTable">
            <div className="row">
              <div className="col-md-10">
                <PMTableHeader />
              </div>
              <div className="col-md-2">
                <button onClick={this.printDocument} className="btn sprintTableBtn">Generate Report</button>
              </div>
            </div>

            <table className="table table-hover">
              <thead>
                <tr className="empTableHeader">
                  <th scope="col">#</th>
                  <th scope="col">Username</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Image</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {this.props.filterProjectManagersList.map(
                  (singleEmployee, index) => {
                    return (
                      <tr>
                        <th scope="row">{++index}</th>
                        <td>{singleEmployee.username}</td>
                        <td>{singleEmployee.name}</td>
                        <td>{singleEmployee.email}</td>
                        <td>
                          <img
                            className="img-fluid rounded-circle employeeImage"
                            src={
                              singleEmployee.profileImg
                                ? singleEmployee.profileImg
                                : ProfileImage
                            }
                            alt="profile image2"
                          />
                        </td>
                        <td>
                          <button
                            className="btn  empTableBtn"
                            style={{
                              backgroundColor: "#087E8B",
                              color: "white",
                            }}
                            onClick={() => {
                              confirmAlert({
                                title: "Confirm to delete",
                                message:
                                  "Are you sure you want to delete the employee",
                                buttons: [
                                  {
                                    label: "Yes",
                                    onClick: () =>
                                      this.onRemoveEmployee(singleEmployee._id),
                                  },
                                  // ,
                                  // {
                                  //   label: 'No',

                                  // }
                                ],
                              });
                            }}
                          >
                            <i class="bi bi-trash-fill"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
          <br />
          <ToastContainer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filterProjectManagersList:
    state.projectManagerReducer.filterProjectManagersList,
});

const mapActionToProps = {
  fetchAllProjectManagersList: actions.fetchAllProjectManagersList,
  deleteProjectManager: actions.deleteProjectManager,
};
export default connect(mapStateToProps, mapActionToProps)(PMTable);
