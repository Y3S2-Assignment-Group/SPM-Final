import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/ProjectManagerActions";
import ProjectsTable from "../../../modules/ProjectManagerPageModules/Projects/ProjectsTable";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

class ProjectsPage extends Component {

  componentDidMount(){
      this.props.fetchProjectManagerDetails()
  }
  render() {
    return (
      <div className="container">
        {this.props.singleProjectManager ? (
          <ProjectsTable projectList={this.props.singleProjectManager.projectsList}/>
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

export default connect(mapStateToProps, mapActionToProps)(ProjectsPage);
