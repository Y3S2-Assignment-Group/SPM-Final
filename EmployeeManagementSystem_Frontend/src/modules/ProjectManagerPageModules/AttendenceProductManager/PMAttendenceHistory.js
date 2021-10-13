import React, { Component } from "react";
import { connect } from "react-redux";

class PMAttendenceHistory extends Component {
  render() {
    return (
      <div>
        <div className="card mt-5 mb-5 boderRadiusCards">
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>In Time</th>
                  <th>Out Time</th>
                </tr>
              </thead>
              <tbody>
                {this.props.singleProjectManager && this.props.singleProjectManager.attendanceList.map(
                  (singleAttendence) => {
                    return (
                      <tr>
                        <td>
                          <h6>{singleAttendence.date}</h6>
                        </td>
                        <td>
                          <h6>{singleAttendence.inTime}</h6>
                        </td>
                        <td>
                          <h6>{singleAttendence.outTime}</h6>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  singleProjectManager: state.projectManagerReducer.singleProjectManager,
});

export default connect(mapStateToProps, null)(PMAttendenceHistory);
