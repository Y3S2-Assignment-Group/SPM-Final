import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/SprintActions";
import * as employeeActions from "../../../store/actions/EmployeeActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class InProgressTasks extends Component {
  constructor(props) {
    super(props);
    this.onChangeTaskStatus = this.onChangeTaskStatus.bind(this);
  }

  onChangeTaskStatus = (issueId) => {
    const issueObj = {
      issue: issueId,
    };

    this.props.convertInprogressToDone(
      this.props.sprintId,
      issueObj,
      () => {
        this.props.fetchEmployee(() => {
          toast.success("Moved to Done", {
            autoClose: 2000,
          });
        });
      },
      () => {
        toast.error("Something went wrong", {
          autoClose: 2000,
        });
      }
    );
  };

  render() {
    return (
      <div className="card boderRadiusCards shadow-none">
        <div className="card-body">
          <div className="row">
            <h3  style={{marginLeft:"20px",marginTop:"10px",fontSize:"20px", fontFamily:"Orbitron"}}>In Progress</h3>

            <hr />
            <br/>
            
            {this.props.inProgressList.map((singleIssue, key) => {
              return (
                <div className="col-md-12 mb-4">
                  <div className="card boderRadiusCards shadow-none" style={{background:"#E5E5E5"}}>
                    <div className="card-body">
                      <h6>{singleIssue.issueName}</h6>
                      <hr />
                      <div className="row">
                        <div className="col-md-6">
                          <i
                            onClick={() => {
                              this.onChangeTaskStatus(singleIssue._id);
                            }}
                            class="bi bi-arrow-right-circle-fill covertBtn"
                            style={{
                              color: "#DF9E45",
                              fontSize: "30px",
                              margin: "5px",
                            }}
                          ></i>
                        </div>
                        <div className="col-md-6">
                          Estimated Days {singleIssue.estimatedTime}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapActionToProps = {
  convertInprogressToDone: actions.convertInprogressToDone,
  fetchEmployee: employeeActions.fetchEmployee,
};

export default connect(null, mapActionToProps)(InProgressTasks);
