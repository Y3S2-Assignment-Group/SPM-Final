import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/EmployeeActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, FormGroup, Input } from "reactstrap";

export class EditEmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.onEditEmployee = this.onEditEmployee.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      employeeId: this.props.singleEmployee._id,
      name: this.props.singleEmployee.name,
      username: this.props.singleEmployee.username,
      email: this.props.singleEmployee.email,
      password: null,
      confirmPassword: null,
      mobileNumber: this.props.singleEmployee.mobileNumber,
    };
  }

  onValueChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onEditEmployee(e) {
    e.preventDefault();

    if (this.state.password === this.state.confirmPassword) {

      let editEmpObj = null;

      if (this.state.password) {
        editEmpObj = {
          password: this.state.password,
          name: this.state.name,
          username: this.state.username,
          mobileNumber: this.state.mobileNumber,
        };
      } else {
        editEmpObj = {
          name: this.state.name,
          username: this.state.username,
          mobileNumber: this.state.mobileNumber,
        };
      }

      this.props.updateEmployee(
        this.state.employeeId,
        editEmpObj,
        () => {
          toast.success("Employee Update Success", {
            autoClose: 1000,
          });
        },
        () => {
          toast.error("Something went wrong", {
            autoClose: 1000,
          });
        }
      );
    } else {
      toast.error("Password mismatch", {
        autoClose: 1000,
      });
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.onEditEmployee}>
          <FormGroup className="mt-3">
            <Input
              type="text"
              name="name"
              id="name"
              value={this.state.name}
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
          <FormGroup className="mt-3">
            <Input
              type="text"
              name="username"
              id="username"
              value={this.state.username}
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
          <FormGroup className="mt-3">
            <Input
              type="email"
              name="email"
              id="email"
              value={this.state.email}
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
          <FormGroup className="mt-3">
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="New password"
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
          <FormGroup className="mt-3">
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm new password"
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
          <FormGroup className="mt-3">
            <Input
              type="text"
              name="mobileNumber"
              id="mobileNumber"
              value={this.state.mobileNumber}
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
          <FormGroup className="mt-4 mb-3">
            <Button className="loginBtn">Edit</Button>
          </FormGroup>
        </Form>
        <ToastContainer />
      </div>
    );
  }
}

const mapActionToProps = {
  updateEmployee: actions.updateEmployee,
};

export default connect(null, mapActionToProps)(EditEmployeeForm);
