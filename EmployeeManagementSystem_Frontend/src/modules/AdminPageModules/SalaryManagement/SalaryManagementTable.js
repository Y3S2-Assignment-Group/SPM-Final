import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/EmployeeActions";
import ProfileImage from "../../../assets/images/profile.png";

class SalaryManagementTable extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {
    this.props.fetchAllEmployeeList();
  }

  render() {
    return (
      <div>
        <div className="card mt-3 boderRadiusCards">
          <div className="card-body">
            <div className="row">
              <h5>{`${this.props.filterEmployeeList.length} Employees`}</h5>
              <h6 className="text-muted">2021-08-24 to 2020-09-24</h6>
              <hr />
            </div>
            <table className="table table-hover">
              <tbody>
              {this.props.filterEmployeeList.map((singleEmployee, index) => {
                return (
                  <tr>
                    <th scope="row">{++index}</th>
                    <td>{singleEmployee.username}</td>
                    <td>{singleEmployee.name}</td>
                    <td>{`${singleEmployee.salary}/=`}</td>
                    <td>
                      <img
                        className="img-fluid rounded-circle employeeImage"
                        src={
                          singleEmployee.profileImg
                            ? singleEmployee.profileImg
                            : ProfileImage
                        }
                        alt="profile image2"
                      />
                    </td>
                    
                  </tr>
                );
              })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filterEmployeeList:state.employeeReducer.filterEmployeeList
});

const mapActionToProps = {
  fetchAllEmployeeList: actions.fetchAllEmployeeList,
};
export default connect(mapStateToProps, mapActionToProps)(SalaryManagementTable);
