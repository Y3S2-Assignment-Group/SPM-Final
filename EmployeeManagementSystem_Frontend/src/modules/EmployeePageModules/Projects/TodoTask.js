import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/SprintActions";
import * as employeeActions from "../../../store/actions/EmployeeActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class TodoTask extends Component {
  constructor(props) {
    super(props);
    this.onChangeTaskStatus = this.onChangeTaskStatus.bind(this);
  }

  onChangeTaskStatus = (issueId) => {
    const issueObj = {
      issue: issueId,
    };

    console.log("sprint id", this.props.sprintId)
    this.props.convertToDoToInprogress(
      this.props.sprintId,
      issueObj,
     async () => {
        this.props.fetchEmployee(()=>{
          toast.success('Moved to In Progress', {
            autoClose: 2000,
          });
        })

      },
      () => {
        toast.error('Something went wrong', {
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
            <h3  style={{marginLeft:"20px",marginTop:"10px",fontSize:"20px", fontFamily:"Orbitron"}}>To do</h3>

            <hr />
            <br/>
            {this.props.toDoList.map((singleIssue) => {
              return (
                <div className="col-md-12 mb-4">
                  <div className="card boderRadiusCards  shadow-none" style={{background:"#E5E5E5"}}>
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
                              color: "#DB380A",
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
        <ToastContainer/>
      </div>
    );
  }
}

const mapActionToProps = {
  convertToDoToInprogress: actions.convertToDoToInprogress,
  fetchEmployee: employeeActions.fetchEmployee,
};

export default connect(null, mapActionToProps)(TodoTask);
