import React, { Component } from "react";
import "./AddEmployeeForm.css";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/EmployeeActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, FormGroup, Input } from "reactstrap";

export class AddEmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.onRegistration = this.onRegistration.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobileNumber: "",
      department: ""
    };
  }

  onValueChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onRegistration(e) {
    e.preventDefault();

    if (this.state.password === this.state.confirmPassword) {

      let rate = 1000;

      if(this.state.department === "Development"){
        rate = 2000;
      }else if(this.state.department === "Marketing"){
        rate = 1500;
      }else{
        rate = 1000;
      }

      const registrationObj = {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        username: this.state.username,
        mobileNumber: this.state.mobileNumber,
        department:this.state.department,
        rate
      };
      this.props.employeeRegister(
        registrationObj,
        () => {
          document.getElementById("myForm").reset();
          toast.success('Employee Registration Success', {
            autoClose: 1000,
          });
        },
        () => {
          toast.error('Something went wrong', {
            autoClose: 1000,
          });
        }
      );
    } else {
      toast.error('Password mismatch', {
        autoClose: 1000,
      });
    }

  }

  render() {
    return (
      <div>
        <div className="card boderRadiusCards cardAddEmployeeForm shadow-none">
          <div className="card-body text-center">
            <div className="container mt-4">
              <h5>EMPLOYEE REGISTRATION !</h5>
            </div>
            <div className="container mt-3">
              <Form onSubmit={this.onRegistration} id="myForm">
                <FormGroup className="mt-3">
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Full Name"
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
                    placeholder="Username"
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
                    placeholder="Email"
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
                    placeholder="Password"
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
                    placeholder="Confirm password"
                    onChange={(e) => {
                      this.onValueChange(e);
                    }}
                  />
                </FormGroup>
                <FormGroup className="mt-3">
                  <Input type="select" name="department" id="department" onChange={(e) => {
                    this.onValueChange(e);
                  }} >
                    <option>Select the Department</option>
                    <option value="Development">Development</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Quality Assurance">Quality Assurance</option>
                  </Input>
                </FormGroup>
                <FormGroup className="mt-3">
            <Input
              type="text"
              name="mobileNumber"
              id="mobileNumber"
              placeholder="Mobile Number"
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
                <FormGroup className="mt-4 mb-3">
                  <Button className="loginBtn">Register</Button>
                </FormGroup>
              </Form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

const mapActionToProps = {
  employeeRegister: actions.employeeRegister
};

export default connect(null, mapActionToProps)(AddEmployeeForm);