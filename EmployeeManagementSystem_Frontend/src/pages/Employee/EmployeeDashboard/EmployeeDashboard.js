import React, { Component } from "react";
import EmployeeCardSection from "../../../modules/EmployeePageModules/EmployeeDashboardModule/EmployeeCardSection";
import EmployeeDashboardHeader from "../../../modules/EmployeePageModules/EmployeeDashboardModule/EmployeeDashboardHeader";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/EmployeeActions";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

class EmployeeDashboard extends Component {
  componentDidMount() {
    this.props.fetchEmployee();
  }

  render() {
    return (
      <div>
        {this.props.currentEmployee ? (
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <EmployeeDashboardHeader
                  currentEmployee={this.props.currentEmployee}
                />
              </div>
              <div className="col-lg-12">
                <EmployeeCardSection />
              </div>
            </div>
          </div>
        ) : (
          <div className="loadingScreen">
            <div className="col-12 p-5">
              <center>
                <Loader
                  type="Grid"
                  color="#087E8B"
                  height={100}
                  width={100}
                  timeout={3000} //3 secs
                />
              </center>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentEmployee: state.employeeReducer.singleEmployee,
});

const mapActionToProps = {
  fetchEmployee: actions.fetchEmployee,
};
export default connect(mapStateToProps, mapActionToProps)(EmployeeDashboard);
