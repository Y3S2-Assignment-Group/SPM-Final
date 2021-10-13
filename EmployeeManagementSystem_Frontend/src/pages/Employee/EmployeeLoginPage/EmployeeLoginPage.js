import React, { Component } from "react";
import LoginForm from "../../../modules/LoginPageModules/LoginForm/LoginForm";
import "./EmployeeLoginPage.css";

export default class EmployeeLoginPage extends Component {
  render() {
    return (
      <div className="loginPageCard">
          <div className="row loginPageRow">
            <div className="col-md-4 loginPageColOne p-5">
                <h1>Welcome</h1>
                <h1>Back</h1>
                <p>Please login to our system</p>
            </div>
            <div className="col-md-4 loginPageColTwo p-5"><LoginForm role="EMPLOYEE"/></div>
          </div>
      </div>
    );
  }
}
