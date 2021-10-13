import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavbarComponent from "../common/NavbarComponent/NavbarComponent";
import EmployeeLoginPage from "../pages/Employee/EmployeeLoginPage/EmployeeLoginPage";
import AdminRegistrationPage from "../pages/Admin/AdminRegistrationPage/AdminRegistrationPage";
import AdminLoginPage from "../pages/Admin/AdminLoginPage/AdminLoginPage";
import PMLoginPage from "../pages/ProjectManager/PMLoginPage/PMLoginPage";
import EditProfile from "../pages/Employee/EditProfilePage/EditProfile";
import AddEmployeePage from "../pages/Admin/AddEmployeePage/AddEmployeePage";
import EmployeeDashboard from "../pages/Employee/EmployeeDashboard/EmployeeDashboard";
import SprintBacklog from "../pages/ProjectManager/SprintBacklog/SprintBacklog";
import ProjectsPage from "../pages/ProjectManager/ProjectsPage/ProjectsPage";
import ProjectDashboard from "../pages/ProjectManager/ProjectsPage/ProjectDashboard";
import AttendencePage from "../pages/Employee/AttendencePage/AttendencePage";
import AdminDashboardPage from "../pages/Admin/AdminDashboard/AdminDashboardPage";
import AdminProjectsPage from "../pages/Admin/AdminProjectsPage/AdminProjectsPage";
import AdminSalaryManagementPage from "../pages/Admin/AdminSalaryManagementPage/AdminSalaryManagementPage";
import ProjectManagerDashboardPage from "../pages/ProjectManager/ProjectManagerDashboardPage/ProjectManagerDashboardPage";
import EmployeeProjectsPage from "../pages/Employee/EmployeeProjectsPage/EmployeeProjectsPage";
import EmployeeSingleProject from "../modules/EmployeePageModules/Projects/EmployeeSingleProject";
import RecruitEmployeesPage from "../pages/ProjectManager/ProjectsPage/RecruitEmployeesPage";
import EvaluateEmployeePage from "../pages/ProjectManager/ProjectsPage/EvaluateEmployeePage";
import EvaluateProjectPage from "../pages/ProjectManager/ProjectsPage/EvaluateProjectPage";
import ProjectManagerRegistrationPage from "../pages/ProjectManager/ProjectManagerRegistrationPage/ProjectManagerRegistrationPage";
import EditProfilePM from "../pages/ProjectManager/EditProfilePage/EditProfilePM";
import PMAttendencePage from "../pages/ProjectManager/PMAttendencePage/PMAttendencePage";
import ForgetPasswordForm from "../modules/LoginPageModules/ForgetPassword/ForgetPasswordForm";
import PMTable from "../modules/AdminPageModules/PMTable/PMTable";

export default class index extends Component {
  render() {
    return (
      <div>
        <NavbarComponent />
        <Router>
          {localStorage.getItem("role") == "EMPLOYEE" ? (
            <Route path="/" exact component={EmployeeDashboard} />
          ) : localStorage.getItem("role") == "ADMIN" ? (
            <Route path="/" exact component={AdminDashboardPage} />
          ) : localStorage.getItem("role") == "PM" ? (
            <Route path="/" exact component={ProjectManagerDashboardPage} />
          ) : (
            <Route path="/" exact component={EmployeeLoginPage} />
          )}
          <Route path="/adminlogin" exact component={AdminLoginPage} />
          <Route
            path="/adminregister"
            exact
            component={AdminRegistrationPage}
          />
          <Route path="/addemployee" exact component={AddEmployeePage} />
          <Route path="/pmlogin" exact component={PMLoginPage} />
          <Route path="/editprofile" exact component={EditProfile} />
          <Route path="/editprofilepm" exact component={EditProfilePM} />
          <Route
            path="/employeedashboard"
            exact
            component={EmployeeDashboard}
          />
          <Route path="/empprojects" exact component={EmployeeProjectsPage} />
          <Route
            path="/empsingleproject/:projectid"
            exact
            component={EmployeeSingleProject}
          />
          <Route
            path="/projectdashboard/:projectid/evaluateemployee"
            exact
            component={EvaluateEmployeePage}
          />
          <Route
            path="/projectdashboard/:projectid/evaluateproject"
            exact
            component={EvaluateProjectPage}
          />
          <Route
            path="/pmregister"
            exact
            component={ProjectManagerRegistrationPage}
          />
          <Route
            path="/pmdashboard"
            exact
            component={ProjectManagerDashboardPage}
          />
          <Route path="/pmlist" exact component={PMTable} />
          <Route
            path="/projectdashboard/:projectid/sprintbacklog"
            exact
            component={SprintBacklog}
          />
          <Route path="/projects" exact component={ProjectsPage} />
          <Route
            path="/projectdashboard/:projectid"
            exact
            component={ProjectDashboard}
          />
          <Route path="/markattendence" exact component={AttendencePage} />
          <Route path="/pmmarkattendence" exact component={PMAttendencePage} />
          <Route path="/admindashboard" exact component={AdminDashboardPage} />
          <Route
            path="/adminprojectsdashboard"
            exact
            component={AdminProjectsPage}
          />
          <Route
            path="/salarymanagement"
            exact
            component={AdminSalaryManagementPage}
          />
          <Route
            path="/projectdashboard/:projectid/addmemberproject"
            exact
            component={RecruitEmployeesPage}
          />
          <Route
            path="/forgotpassword/:role"
            exact
            component={ForgetPasswordForm}
          />
        </Router>
      </div>
    );
  }
}
