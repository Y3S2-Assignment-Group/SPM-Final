import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/EmployeeActions";
import "./EmployeeTable.css";
import ProfileImage from "../../../assets/images/profile.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import EditEmployeeForm from "../EditEmployeeForm/EditEmployeeForm";

import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import EmployeeTableHeader from "./EmployeeTableHeader";

class EmployeeTable extends Component {
  constructor(props) {
    super(props);
    this.onRemoveEmployee = this.onRemoveEmployee.bind(this);
    this.state = {
      modalEditEmployee: false,
      singleEmployeeObject: null,
    };
  }

  componentDidMount() {
    this.props.fetchAllEmployeeList();
  }

  toggleEditEmployee = () => {
    this.setState({
      modalEditEmployee: !this.state.modalEditEmployee,
    });
  };

  onRemoveEmployee(employeeId) {
    this.props.deleteEmployee(
      employeeId,
      () => {
        toast.success("Employee delete Success", {
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

  render() {
    return (
      <div className="card boderRadiusCards shadow-none">
        <div className="card-body empTable">
        <EmployeeTableHeader/>
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
              {this.props.employeeList.map((singleEmployee, index) => {
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
                        style={{ backgroundColor: "#087E8B", color: "white" }}
                        onClick={() => {
                          this.setState({
                            singleEmployeeObject: singleEmployee,
                          });
                          this.toggleEditEmployee();
                        }}
                      >
                        <i class="bi bi-gear-fill"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn  empTableBtn"
                        style={{ backgroundColor: "#087E8B", color: "white" }}
                        onClick={() => {
                          confirmAlert({
                            title: 'Confirm to delete',
                            message: 'Are you sure you want to delete the employee',
                            buttons: [
                              {
                                label: 'Yes',
                                onClick: () => this.onRemoveEmployee(singleEmployee._id)
                              }
                              // ,
                              // {
                              //   label: 'No',
                                
                              // }
                            ]
                          });
                          
                        }}
                      >
                        <i class="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <br />
        <ToastContainer />
        {/* Modals Section */}

        {/* Edit Project Moda */}
        <Modal
          isOpen={this.state.modalEditEmployee}
          toggle={this.toggleEditEmployee}
        >
          <ModalHeader toggle={this.toggleEditEmployee}>
            EDIT EMPLOYEE
          </ModalHeader>
          <ModalBody>
            <EditEmployeeForm
              singleEmployee={this.state.singleEmployeeObject}
            />
          </ModalBody>
        </Modal>

        {/* End of Modals Section */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  employeeList: state.employeeReducer.filterEmployeeList,
});

const mapActionToProps = {
  fetchAllEmployeeList: actions.fetchAllEmployeeList,
  deleteEmployee: actions.deleteEmployee,
};
export default connect(mapStateToProps, mapActionToProps)(EmployeeTable);
