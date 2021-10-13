import React, { Component } from "react";
import EvaluateProjectDashboard from "../../../modules/ProjectManagerPageModules/EvaluateProject/EvaluateProjectDashboard";
import { connect } from "react-redux";
import * as projectActions from "../../../store/actions/ProjectActions";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

class EvaluateProjectPage extends Component {
  componentDidMount() {
    this.props.fetchProjectById(this.props.match.params.projectid);
  }
  render() {
    return (
      <div>
        {this.props.singleProject ? (
          <div className="container">
            <EvaluateProjectDashboard
              singleProject={this.props.singleProject}
            />
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
  singleProject: state.projectReducer.singleProject,
});

const mapActionToProps = {
  fetchProjectById: projectActions.fetchProjectById,
};

export default connect(mapStateToProps, mapActionToProps)(EvaluateProjectPage);
