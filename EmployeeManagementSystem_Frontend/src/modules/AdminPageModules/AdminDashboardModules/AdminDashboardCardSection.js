import React, { Component } from "react";
import {Link} from "react-router-dom";

export default class AdminDashboardCardSection extends Component {
  render() {
    return (
      <div>
        <div className="row mt-4">
          <div className="col-lg-4 p-3">
            <Link to="/addemployee">
              <div className="card employeeDashboardCard boderRadiusCards">
                <div className="card-body employeeDashboardCardOne">
                 <h5 style={{fontFamily:"Orbitron",fontSize:"30px",color:"#087E8B"}}>Employee</h5>
                  <h5 style={{fontFamily:"Orbitron",fontSize:"30px",color:"#087E8B"}}>management</h5>
              </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 p-3">
            <Link to="/pmlist">
              <div className="card employeeDashboardCard boderRadiusCards">
                <div className="card-body employeeDashboardCardOne">
                 <h5 style={{fontFamily:"Orbitron",fontSize:"30px",color:"#087E8B"}}>Project Managers</h5>
                  <h5 style={{fontFamily:"Orbitron",fontSize:"30px",color:"#087E8B"}}>management</h5>
              </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 p-3">
            <Link to="/adminprojectsdashboard">
              <div className="card employeeDashboardCard boderRadiusCards">
                <div className="card-body employeeDashboardCardTwo">
                <h5 style={{fontFamily:"Orbitron",fontSize:"30px",color:"#087E8B"}}>Project</h5>
                  <h5 style={{fontFamily:"Orbitron",fontSize:"30px",color:"#087E8B"}}>management</h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 p-3">
            <Link to="/salarymanagement">
              <div className="card employeeDashboardCard boderRadiusCards">
                <div className="card-body employeeDashboardCardThree">
                  <h5 style={{fontFamily:"Orbitron",fontSize:"30px",color:"#087E8B"}}>Salary</h5>
                  <h5 style={{fontFamily:"Orbitron",fontSize:"30px",color:"#087E8B"}}>management</h5>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
