import React, { Component } from "react";
import PMAttendenceHistory from "../../../modules/ProjectManagerPageModules/AttendenceProductManager/PMAttendenceHistory";
import PMMarkAttendenceForm from "../../../modules/ProjectManagerPageModules/AttendenceProductManager/PMMarkAttendenceForm";
import PMProfileDetails from "../../../modules/ProjectManagerPageModules/AttendenceProductManager/PMProfileDetails";
import { connect } from "react-redux";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

class PMAttendencePage extends Component {
  render() {
    return (
      <div>
        {this.props.singleProjectManager ? (
          <div className="container">
            <div className="row mt-5">
              <div className="col-md-4">
                <PMProfileDetails />
              </div>
              <div className="col-md-8">
                <PMMarkAttendenceForm />
              </div>
              <div className="col-md-4"></div>
              <div className="col-md-8">
                <PMAttendenceHistory />
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
  singleProjectManager: state.projectManagerReducer.singleProjectManager,
});

export default connect(mapStateToProps, null)(PMAttendencePage);
