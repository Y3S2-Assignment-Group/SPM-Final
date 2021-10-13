import React, { Component } from "react";
import "./ProjectManagerDashboardHeader.css";

export default class EmployeeDashboardHeader extends Component {
  render() {
    return (
      <div>
        {this.props.projectManagerObj ? (
          <div className="mt-3">
            <div className="row">
              <div className="col-lg-3 mt-1">
                <div className="card-body">
                  <div className="row p-2">
                    <div className="col empDashboardUserDetailsTwo mt-2">
                      <span className="display-5 fw-bold ">{`Hello!`}</span>
                      <h3>{this.props.projectManagerObj.name}</h3>
                      <h6 className="text-muted">
                        {`${this.props.projectManagerObj.username}`}
                      </h6>
                      <h6 style={{ color: "#087E8B" }}>
                        {`Salary for Month : ${this.props.projectManagerObj.salary}/=`}
                      </h6>
                      {this.props.projectManagerObj.attendanceList &&
                      this.props.projectManagerObj.attendanceList.length > 0 ? (
                        <h6 className="text-muted">
                          {`Working Days - ${this.props.projectManagerObj.attendanceList.length}`}
                        </h6>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
