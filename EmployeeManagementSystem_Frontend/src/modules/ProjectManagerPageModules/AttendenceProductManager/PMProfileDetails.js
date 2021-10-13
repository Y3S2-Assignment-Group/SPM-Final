import React, { Component } from "react";
import Clock from "react-live-clock";
import { connect } from "react-redux";

class PMProfileDetails extends Component {
  render() {
    return (
      <div>
        <div className="card boderRadiusCards">
          <div className="card-body">
            <div className="row p-2">
              <div className="col-lg-12 empDashboardUserDetailsColOne">
                <img
                  className="empDashboardImage img-fluid"
                  src={this.props.singleProjectManager.profileImg}
                  alt="empImage"
                />
              </div>
              <div className="col-lg-12 empDashboardUserDetailsTwo mt-2 text-center">
                <h6>{this.props.singleProjectManager.name}</h6>
                <h6 className="text-muted">{this.props.singleProjectManager.username}</h6>
                <h6 className="text-muted">Product Manager</h6>
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
  singleProjectManager: state.projectManagerReducer.singleProjectManager,
});

export default connect(
  mapStateToProps,
  null
)(PMProfileDetails);