import React, { Component } from "react";
import ProjectCardSection from "../../../modules/ProjectManagerPageModules/Projects/ProjectCardSection";
import ProjectDashboardHeader from "../../../modules/ProjectManagerPageModules/Projects/ProjectDashboardHeader";

export default class ProjectDashboard extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* <ProjectDashboardHeader /> */}
            </div>
            <div className="col-lg-12">
              <ProjectCardSection/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
