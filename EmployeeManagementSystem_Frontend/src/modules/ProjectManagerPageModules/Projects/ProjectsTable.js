import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ProjectsTable.css";

export default class ProjectsTable extends Component {
  render() {
    return (
      <div className="card mt-5 boderRadiusCards">
        <div className="card-body">
          <div className="row">
            <h5>Project Management</h5>
            <hr />
          </div>
          <table className="table table-hover">
            <tbody>
              {this.props.projectList.map((singleProject)=>{
                return(
                  <tr>
                  <td>
                    <h6>{singleProject._id}</h6>
                  </td>
                  <td>
                    <h6>{singleProject.projectName}</h6>
                  </td>
                  <td>
                    <h6>{singleProject.descripton}</h6>
                  </td>
                  <td>
                    <Link to={`/projectdashboard/${singleProject._id}`}>
                      <button className="btn empTableBtn empProjectTableBtn">
                        <i class="bi bi-caret-up-square-fill"></i>
                      </button>
                    </Link>
                  </td>
                </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
