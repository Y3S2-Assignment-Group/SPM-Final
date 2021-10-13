import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./EmployeeProjects.css";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/EmployeeActions";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Clock from "react-live-clock";


class EmployeeProjects extends Component {
  componentDidMount() {
    this.props.fetchEmployee();
  }

  render() {
    return (

      <div>
        <span className="m-5">
          <h5 style={{fontFamily:"Orbitron",fontSize:"40px",color:"#087E8B"}}>Project Overview</h5>
        </span>
        <div className="card  boderRadiusCards">
        <div className="card-body">
          <div>
            <div className="mt-3">
              <h1 style={{fontFamily:"Orbitron",fontSize:"20px",color:"#vlack",marginLeft:"20px"}}>PROJECTS</h1>
            </div>
            <div >
              <Clock style={{marginLeft:"20px",color:"grey"}} format="YYYY/MM/DD:HH:mm:ss" interval={1000} ticking={true} />  
            </div>
            
            <div className="row mb-4">
              {this.props.currentEmployee ? (
                this.props.currentEmployee.projectsList.map(
                  (singleproj, key) => {
                    return (
                      <div className="col-md-3">
                        <Link to={`/empsingleproject/${singleproj._id}`}>
                          <div className="card mt-5 p-1 boderRadiusCards empProjectCards">
                            <div className="card-body" >
                              <h4 style={{fontSize:"25px",marginTop:"10px"}}>{singleproj.projectName}</h4>
                              <h6 style={{fontSize:"15px"}} className="empProjectCardsText mb-3">
                                {singleproj.descripton}
                              </h6>
                              
                              <h6 className="mt-3 p-0" style={{fontSize:"15px"}}>Project Manager</h6>
                              <h6 className="empProjectCardsText p-0" style={{fontSize:"12px" , marginBottom:"20px"}}>
                                {singleproj.projectManager.name}
                              </h6>
                              <span
                                style={{
                                  color: "#FFFFFF",
                                  paddingRight: "10px",
                                  paddingLeft: "10px",
                                  fontSize: "25px",
                                  margin: "5px",
                          
                                  borderRadius: "50%",
                                  backgroundColor: "#DB380A",
                                }}
                              >
                                {singleproj.sprintList ? "4" : ""}
                              </span>
                              <span
                                style={{
                                  color: "#FFFFFF",
                                  paddingRight: "10px",
                                  paddingLeft: "10px",
                                  fontSize: "25px",
                                  margin: "5px",
                                  borderRadius: "50%",
                                  backgroundColor: "#DF9E45",
                                }}
                              >
                                {singleproj.sprintList ? "4" : ""}
                              </span>
                              <span
                                style={{
                                  color: "#FFFFFF",
                                  paddingRight: "10px",
                                  paddingLeft: "10px",
                                  fontSize: "25px",
                                  margin: "5px",
                                  borderRadius: "50%",
                                  backgroundColor: "#028759",
                                }}
                              >
                                {singleproj.sprintList ? "4" : ""}
                              </span>
                            </div>
                          </div>
                        </Link>
                        
                      </div>
                    );
                  }
                )
              ) : (
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
              )}
              
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentEmployee: state.employeeReducer.singleEmployee,
});

const mapActionToProps = {
  fetchEmployee: actions.fetchEmployee,
};
export default connect(mapStateToProps, mapActionToProps)(EmployeeProjects);
