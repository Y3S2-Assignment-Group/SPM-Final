import React, { Component } from "react";
import "./NavbarComponent.css";
import { connect } from "react-redux";
import * as employeeActions from "../../store/actions/EmployeeActions";
import * as pmActions from "../../store/actions/ProjectManagerActions";
import * as adminActions from "../../store/actions/AdminActions";
import * as authActions from "../../store/actions/authActions";

class NavbarComponent extends Component {
  componentDidMount() {
    switch (localStorage.getItem("role")) {
      case "ADMIN":
        this.props.fetchAdmin();
        break;
      case "PM":
        this.props.fetchPM();
        break;
      case "EMPLOYEE":
        this.props.fetchEmployee();
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg econnecteeNavbar">
          <div className="container-fluid">
            <a className="navbar-brand text-white" href="/">
              Econnectee
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              {/* If the role of the user is employee */}
              {this.props.currentEmployee ? (
                <>
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a
                        className="nav-link text-white"
                        aria-current="page"
                        href="/employeedashboard"
                      >
                        Home
                      </a>
                    </li>
                  </ul>
                  <span class="span-inline my-2 my-lg-0">
                    <div className="row">
                      <div className="col">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                          <li class="nav-item dropdown">
                            <a
                              class="nav-link dropdown-toggle text-white"
                              href="#"
                              id="navbarDropdown"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {this.props.currentEmployee.name}
                            </a>
                            <ul
                              class="dropdown-menu"
                              aria-labelledby="navbarDropdown"
                            >
                              <li>
                                <a
                                  class="dropdown-item"
                                  href="#"
                                  onClick={() => {
                                    this.props.logout();
                                  }}
                                >
                                  Logout
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                      <div className="col">
                        {
                          <img
                            width="50px"
                            height="50px"
                            style={{ borderRadius: "50%" }}
                            src={this.props.currentEmployee.profileImg}
                          />
                        }
                      </div>
                    </div>
                  </span>
                </>
              ) : (
                ""
              )}
              {/* If the role of the user is PM */}
              {this.props.currentPM ? (
                <>
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a
                        className="nav-link text-white"
                        aria-current="page"
                        href="/pmdashboard"
                      >
                        Home
                      </a>
                    </li>
                  </ul>
                  <span class="span-inline my-2 my-lg-0">
                    <div className="row">
                      <div className="col">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                          <li class="nav-item dropdown">
                            <a
                              class="nav-link dropdown-toggle text-white"
                              href="#"
                              id="navbarDropdown"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {this.props.currentPM.name}
                            </a>
                            <ul
                              class="dropdown-menu"
                              aria-labelledby="navbarDropdown"
                            >
                              <li>
                                <a
                                  class="dropdown-item"
                                  href="#"
                                  onClick={() => {
                                    this.props.logout();
                                  }}
                                >
                                  Logout
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                      <div className="col">
                        {
                          <img
                            width="50px"
                            height="50px"
                            style={{ borderRadius: "50%" }}
                            src={this.props.currentPM.profileImg}
                          />
                        }
                      </div>
                    </div>
                  </span>
                </>
              ) : (
                ""
              )}

              {/* If the role of the user is admin */}
              {this.props.currentAdmin ? (
                <>
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a
                        className="nav-link text-white"
                        aria-current="page"
                        href="/admindashboard"
                      >
                        Home
                      </a>
                    </li>
                  </ul>
                  <span class="span-inline my-2 my-lg-0">
                    <div className="row">
                      <div className="col">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                          <li class="nav-item dropdown">
                            <a
                              class="nav-link dropdown-toggle text-white"
                              href="#"
                              id="navbarDropdown"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {this.props.currentAdmin.name}
                            </a>
                            <ul
                              class="dropdown-menu"
                              aria-labelledby="navbarDropdown"
                            >
                              <li>
                                <a
                                  class="dropdown-item"
                                  href="#"
                                  onClick={() => {
                                    this.props.logout();
                                  }}
                                >
                                  Logout
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                      <div className="col">
                        {
                          <img
                            width="50px"
                            height="50px"
                            style={{ borderRadius: "50%" }}
                            src={this.props.currentAdmin.profileImg}
                          />
                        }
                      </div>
                    </div>
                  </span>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentEmployee: state.employeeReducer.singleEmployee,
  currentAdmin: state.AdminReducer.singleAdmin,
  currentPM: state.projectManagerReducer.singleProjectManager,
});

const mapActionToProps = {
  fetchEmployee: employeeActions.fetchEmployee,
  fetchAdmin: adminActions.fetchAdmin,
  fetchPM: pmActions.fetchProjectManagerDetails,

  logout: authActions.logout,
};
export default connect(mapStateToProps, mapActionToProps)(NavbarComponent);
