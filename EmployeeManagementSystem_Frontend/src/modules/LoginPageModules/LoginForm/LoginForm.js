import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/authActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import PMLoginFaceAuth from "./PMLoginFaceAuth";
import EmployeeLoginFaceAuth from "./EmployeeLoginFaceAuth";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.toggleProjectManagerModal = this.toggleProjectManagerModal.bind(this);
    this.toggleEmployeeModal = this.toggleEmployeeModal.bind(this);
    this.toggleAdminModal = this.toggleAdminModal.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      email: "",
      password: "",
      modalProjectManager: false,
      modalEmployee: false,
    };
  }

  toggleProjectManagerModal = () => {
    this.setState({
      modalProjectManager: !this.state.modalProjectManager,
    });
  };

  toggleEmployeeModal = () => {
    this.setState({
      modalEmployee: !this.state.modalEmployee,
    });
  };

  toggleAdminModal = () => {
    toast.warning("This feature is not available for ADMIN", {
      autoClose: false,
    });
  };

  onValueChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onLogin(e) {
    e.preventDefault();

    const loginObj = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(loginObj);
    if (this.props.role === "EMPLOYEE") {
      this.props.employeeLogin(
        loginObj,
        () => {
          toast.success("Login Success", {
            autoClose: false,
          });
          window.location = "/employeedashboard";
        },
        () => {
          toast.error("Username or password incorrect. Please try again", {
            autoClose: false,
          });
        }
      );
    } else if (this.props.role === "ADMIN") {
      this.props.adminLogin(
        loginObj,
        () => {
          toast.success("Login Success", {
            autoClose: false,
          });
          window.location = "/admindashboard";
        },
        () => {
          toast.error("Username or password incorrect. Please try again", {
            autoClose: false,
          });
        }
      );
    } else if (this.props.role === "PROJECT MANAGER") {
      this.props.projectManagerLogin(
        loginObj,
        () => {
          toast.success("Login Success", {
            autoClose: false,
          });
          window.location = "/pmdashboard";
        },
        () => {
          toast.error("Username or password incorrect. Please try again", {
            autoClose: false,
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="container text-center">
        <div className="container mt-5">
          <h5> {this.props.role} LOGIN HERE !</h5>
        </div>
        <div className="container mt-3">
          <Form onSubmit={this.onLogin}>
            <FormGroup className="mt-2">
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
            <FormGroup className="mt-2">
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
            <a className="text-left" href={`/forgotpassword/${this.props.role}`}>
              Forget password?
            </a>
            <FormGroup className="mt-2">
              <Button className="mt-2 loginBtn">Login</Button>
            </FormGroup>
          </Form>
        </div>
        <div className="mt-2 mb-5">
          <p>or</p>
          <Button
            className="mt-2 loginBtn"
            onClick={() => {
              this.props.role === "EMPLOYEE"
                ? this.toggleEmployeeModal()
                : this.props.role === "PROJECT MANAGER"
                ? this.toggleProjectManagerModal()
                : this.toggleAdminModal();
            }}
          >
            Login With Face
          </Button>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-6">
            <a href="/pmlogin">PRODUCT MANAGER</a>
          </div>
          <div className="col-md-6">
            <a href="/adminlogin">ADMIN</a>
          </div>
        </div>

        {this.props.role === "PROJECT MANAGER" ? (
          <a href="/pmregister">Register Here !</a>
        ) : this.props.role === "ADMIN" ? (
          <a href="/adminregister">Register Here !</a>
        ) : (
          ""
        )}

        <ToastContainer />
        {/* Modals Section */}

        {/* Login Project Manager Modal */}
        <Modal
          isOpen={this.state.modalProjectManager}
          toggle={this.toggleProjectManagerModal}
        >
          <ModalHeader toggle={this.toggleProjectManagerModal}>
            PROJECT MANAGER LOGIN
          </ModalHeader>
          <ModalBody>
            <PMLoginFaceAuth />
          </ModalBody>
        </Modal>

        {/* Login Employee Modal */}
        <Modal
          isOpen={this.state.modalEmployee}
          toggle={this.toggleEmployeeModal}
        >
          <ModalHeader toggle={this.toggleEmployeeModal}>
            EMPLOYEE LOGIN
          </ModalHeader>
          <ModalBody>
            <EmployeeLoginFaceAuth />
          </ModalBody>
        </Modal>

        {/* End of Modals Section */}
      </div>
    );
  }
}

const mapActionToProps = {
  employeeLogin: actions.employeeLogin,
  adminLogin: actions.adminLogin,
  projectManagerLogin: actions.productManagerLogin,
};

export default connect(null, mapActionToProps)(LoginForm);
