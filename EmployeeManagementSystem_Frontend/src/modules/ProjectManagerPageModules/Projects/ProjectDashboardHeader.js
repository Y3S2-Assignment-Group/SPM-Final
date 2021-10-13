import React, { Component } from "react";

export default class ProjectDashboardHeader extends Component {
  render() {
    return (
      <div>
        <div className="mt-5">
          <div className="row">
            <div className="col-lg-6 mt-2">
              <div className="card boderRadiusCards">
                <div className="card-body">
                  <div className="row p-2">
                    <div className="col-lg-6 empDashboardUserDetailsColOne">
                      <img
                        className="empDashboardImage img-fluid"
                        src="https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"
                        alt="empImage"
                      />
                    </div>
                    <div className="col-lg-6 empDashboardUserDetailsTwo mt-2">
                      <h2>Hello</h2>
                      <h6>Dilmi Palliyaguruge</h6>
                      <h6 className="text-muted">PM001</h6>
                      <h6 className="text-muted">Project Manager</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mt-2">
              <div className="card boderRadiusCards p-2">
                <div className="card-body">
                  <h2>Project Information</h2>
                  <h6 className="text-muted">P001</h6>
                  <h6 className="text-muted">Employee Management System</h6>
                  <h6 className="text-muted">10 Employees</h6>
                  <h6 className="text-muted">10 Sprints</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
