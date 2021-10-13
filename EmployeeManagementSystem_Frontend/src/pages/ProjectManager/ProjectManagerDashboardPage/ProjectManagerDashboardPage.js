import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/ProjectManagerActions";
import ProjectManagerDashboardHeader from "../../../modules/ProjectManagerPageModules/ProjectManagerDashboardModule/ProjectManagerDashboardHeader";
import ProjectManagerCardSection from "../../../modules/ProjectManagerPageModules/ProjectManagerDashboardModule/ProjectManagerCardSection";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

class ProjectManagerDashboardPage extends Component {
  componentDidMount() {
    this.props.fetchProjectManagerDetails();
  }

  render() {
    return (
      <div>
        {this.props.singleProjectManager ? (
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <ProjectManagerDashboardHeader
                  projectManagerObj={this.props.singleProjectManager}
                />
              </div>
              <div className="col-lg-12">
                <ProjectManagerCardSection
                  projectManagerObj={this.props.singleProjectManager}
                />
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

const mapActionToProps = {
  fetchProjectManagerDetails: actions.fetchProjectManagerDetails,
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(ProjectManagerDashboardPage);
