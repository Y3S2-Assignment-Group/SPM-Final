import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/ProjectActions";
import SprintBacklogHeader from "../../../modules/ProjectManagerPageModules/SprintBacklogModules/SprintBacklogHeader";
import SprintTable from "../../../modules/ProjectManagerPageModules/SprintBacklogModules/SprintTable";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

class SprintBacklog extends Component {
  componentDidMount() {
    this.props.fetchProjectById(this.props.match.params.projectid);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.singleProject !== nextProps.singleProject) {
      this.props.fetchProjectById(this.props.match.params.projectid);
    }
  }

  render() {
    return (
      <div className="container">
        {this.props.singleProject ? (
          <div className="row">
            <div className="col-lg-12">
              <SprintBacklogHeader projectId={this.props.match.params.projectid} />
            </div>
            <div className="col-lg-12">
              <SprintTable projectObj={this.props.singleProject}/>
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
  singleProject: state.projectReducer.singleProject,
});

const mapActionToProps = {
  fetchProjectById: actions.fetchProjectById,
};
export default connect(mapStateToProps, mapActionToProps)(SprintBacklog);
