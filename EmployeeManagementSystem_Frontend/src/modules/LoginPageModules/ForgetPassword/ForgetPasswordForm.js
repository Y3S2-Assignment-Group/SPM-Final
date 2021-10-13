import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/ForgotpasswordActions";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

class ForgetPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.onSendResetKey = this.onSendResetKey.bind(this);
    this.onResetPassword = this.onResetPassword.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      email: "",
      resetKey: "",
      password: "",
      emailStatus: false,
      loading: false,
    };
  }

  onSendResetKey(e) {
    e.preventDefault();
    this.setState({ emailStatus: false, loading: true });
    const emailObject = {
      email: this.state.email,
    };
    this.props.sendResetMail(
      emailObject,
      () => {
        toast.success("Reset key sent to your email", {
          autoClose: 3000,
        });
        this.setState({ emailStatus: true, loading: false });
      },
      () => {
        toast.error("Something went wrong", {
          autoClose: 3000,
        });
      }
    );
  }

  onValueChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onResetPassword(e) {
    e.preventDefault();
    this.setState({ emailStatus: false, loading: true });
    const resetObject = {
      email: this.state.email,
      resetKey: this.state.resetKey,
      password: this.state.password,
    };

    if (this.props.match.params.role === "EMPLOYEE") {
      this.props.resetEmployeePassword(
        resetObject,
        () => {
          toast.success("Password Reset Successfully", {
            autoClose: 3000,
          });
          window.location = "/";
        },
        () => {
          toast.error("Something went wrong", {
            autoClose: 3000,
          });
        }
      );
    }
    if (this.props.match.params.role === "PROJECT MANAGER") {
      this.props.resetProjectManagerPassword(
        resetObject,
        () => {
          toast.success("Password Reset Successfully", {
            autoClose: 3000,
          });
          window.location = "/";
        },
        () => {
          toast.error("Something went wrong", {
            autoClose: 3000,
          });
        }
      );
    }

    if (this.props.match.params.role === "ADMIN") {
      this.props.resetAdminPassword(
        resetObject,
        () => {
          toast.success("Password Reset Successfully", {
            autoClose: 3000,
          });
          window.location = "/";
        },
        () => {
          toast.error("Something went wrong", {
            autoClose: 3000,
          });
        }
      );
    }
  }

  render() {
    return (
      <div>
        <div className="loginPageCard">
          <div className="row loginPageRow">
            <div className="col-md-4 loginPageColOne p-5">
              <h1>Forgot</h1>
              <h1>Password</h1>
              <p>Reset your password easily</p>
            </div>
            <div className="col-md-4 loginPageColTwo p-5">
              {this.state.loading ? (
                <div className="col-12 p-5">
                  <center>
                    <Loader
                      type="Grid"
                      color="#087E8B"
                      height={100}
                      width={100}
                    />
                  </center>
                </div>
              ) : (
                ""
              )}

              {!this.state.emailStatus ? (
                <Form onSubmit={this.onSendResetKey}>
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
                    <Button className="mt-2 loginBtn">Send Reset Key</Button>
                  </FormGroup>
                </Form>
              ) : (
                <Form onSubmit={this.onResetPassword}>
                  <FormGroup className="mt-2">
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
                  <FormGroup className="mt-2">
                    <Input
                      type="number"
                      name="resetKey"
                      id="resetKey"
                      placeholder="Reset Key"
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
                      placeholder="New Password"
                      onChange={(e) => {
                        this.onValueChange(e);
                      }}
                    />
                  </FormGroup>
                  <FormGroup className="mt-2">
                    <Button className="mt-2 loginBtn">Reset</Button>
                  </FormGroup>
                </Form>
              )}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

const mapActionToProps = {
  sendResetMail: actions.sendResetMail,
  resetEmployeePassword: actions.resetEmployeePassword,
  resetProjectManagerPassword: actions.resetProjectManagerPassword,
  resetAdminPassword: actions.resetAdminPassword,
};

export default connect(null, mapActionToProps)(ForgetPasswordForm);
