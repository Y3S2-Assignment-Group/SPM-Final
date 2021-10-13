import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ProjectCardSection.css";

export default class ProjectCardSection extends Component {
  render() {
    return (
      <div>
        <div>
          <div className="row mt-4">
            <div className="col-lg-4 p-3">
              <Link to={`${window.location.pathname}/addmemberproject`}>
                <div className="card projectDashboardCard boderRadiusCards">
                  <div className="card-body projectDashboardCardOne">
                  <h5 style={{fontFamily:"Orbitron",fontSize:"40px",color:"#470912"}}>Recruit</h5>
                  <h5 style={{fontFamily:"Orbitron",fontSize:"40px",color:"#470912"}}>Employee</h5>
              </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-4 p-3">
              <Link to={`${window.location.pathname}/sprintbacklog`}>
                <div className="card projectDashboardCard boderRadiusCards">
                  <div className="card-body projectDashboardCardTwo">
                  <h5 style={{fontFamily:"Orbitron",fontSize:"40px",color:"#470912"}}>Sprint </h5>
                  <h5 style={{fontFamily:"Orbitron",fontSize:"40px",color:"#470912"}}>management</h5>
              </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-4 p-3">
              <Link to={`${window.location.pathname}/evaluateemployee`}>
                <div className="card projectDashboardCard boderRadiusCards">
                  <div className="card-body projectDashboardCardThree">
                  <h5 style={{fontFamily:"Orbitron",fontSize:"40px",color:"#470912"}}>Evaluate</h5>
                  <h5 style={{fontFamily:"Orbitron",fontSize:"40px",color:"#470912"}}>Employee</h5>
              </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-4 p-3">
              <Link to={`${window.location.pathname}/evaluateproject`}>
                <div className="card projectDashboardCard boderRadiusCards">
                  <div className="card-body projectDashboardCardFour">
                  <h5 style={{fontFamily:"Orbitron",fontSize:"40px",color:"#470912"}}>Evaluate</h5>
                  <h5 style={{fontFamily:"Orbitron",fontSize:"40px",color:"#470912"}}>Project</h5>
              </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
