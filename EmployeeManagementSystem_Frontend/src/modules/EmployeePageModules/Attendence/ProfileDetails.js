import React, { Component } from "react";
import Clock from "react-live-clock";
import { connect } from "react-redux";

class ProfileDetails extends Component {
  render() {
    return (
      <div>
        <div className="card boderRadiusCards">
          <div className="card-body">
            <div className="row p-2">
              <div className="col-lg-12 empDashboardUserDetailsColOne">
                <img
                  className="empDashboardImage img-fluid"
                  src={this.props.singleEmployee.profileImg}
                  alt="empImage"
                />
              </div>
              <div className="col-lg-12 empDashboardUserDetailsTwo mt-2 text-center">
                <h6>{this.props.singleEmployee.name}</h6>
                <h6 className="text-muted">{this.props.singleEmployee.username}</h6>
                <h6 className="text-muted">{this.props.singleEmployee.department}</h6>
                <h1>
                  <Clock format="HH:mm:ss" interval={1000} ticking={true} />
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  singleEmployee: state.employeeReducer.singleEmployee,
});

export default connect(
  mapStateToProps,
  null
)(ProfileDetails);