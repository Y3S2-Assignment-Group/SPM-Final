import React, { Component } from "react";
import {Link} from "react-router-dom";
import "./EmployeeCardSection.css";
import "../../../text.css"

export default class EmployeeCardSection extends Component {
  render() {
    return (
      <div>
        <div className="row mt-4">
          <div className="col-lg-4 p-3">
            <Link to="/editprofile">
            <div className="card employeeDashboardCard boderRadiusCards">
              <div className="card-body employeeDashboardCardOne">
                <h5 style={{fontFamily:"Orbitron",fontSize:"40px",color:"#087E8B"}}>Edit</h5>
                <h5 style={{fontFamily:"Orbitron",fontSize:"40px",color:"#087E8B"}}>Profile</h5>
              </div>
            </div>
            </Link>
          </div>
          <div className="col-lg-4 p-3">
          <Link to="/empprojects">
            <div className="card employeeDashboardCard boderRadiusCards">
              <div className="card-body employeeDashboardCardTwo">
                <h5 style={{fontFamily:"Orbitron",fontSize:"40px",color:"#087E8B"}}>Project</h5>
                <h5 style={{fontFamily:"Orbitron",fontSize:"40px",color:"#087E8B"}}>Details</h5>
              </div>
            </div>
            </Link>
          </div> 
          <div className="col-lg-4 p-3">
          <Link to="/markattendence">
            <div className="card employeeDashboardCard boderRadiusCards">
              <div className="card-body employeeDashboardCardThree">
              <h5 style={{fontFamily:"Orbitron",fontSize:"40px",color:"#087E8B"}}>Mark</h5>
                <h5 style={{fontFamily:"Orbitron",fontSize:"40px",color:"#087E8B"}}>Attendance</h5>              </div>
            </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
