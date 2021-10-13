import React, { Component } from "react";
import AttendenceHistory from "../../../modules/EmployeePageModules/Attendence/AttendenceHistory";
import MarkAttendenceForm from "../../../modules/EmployeePageModules/Attendence/MarkAttendenceForm";
import ProfileDetails from "../../../modules/EmployeePageModules/Attendence/ProfileDetails";
import { connect } from "react-redux";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

class AttendencePage extends Component {
  render() {
    return (
      <div>
        {this.props.singleEmployee ? (
          <div className="container">
            <div className="row mt-5">
              <div className="col-md-4">
                <ProfileDetails />
              </div>
              <div className="col-md-8">
                <MarkAttendenceForm />
              </div>
              <div className="col-md-4"></div>
              <div className="col-md-8">
                <AttendenceHistory />
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
  singleEmployee: state.employeeReducer.singleEmployee,
});

export default connect(mapStateToProps, null)(AttendencePage);
