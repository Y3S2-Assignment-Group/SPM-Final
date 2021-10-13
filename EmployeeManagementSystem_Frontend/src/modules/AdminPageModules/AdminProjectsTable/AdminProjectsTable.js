import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/ProjectActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import AddProjectForm from "../AddProjectForm/AddProjectForm";
import EditProjectForm from "../EditProjectForm/EditProjectForm";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ProjectTableHeader from "./ProjectTableHeader";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

class AdminProjectsTable extends Component {
  constructor(props) {
    super(props);
    this.toggleCreateProject = this.toggleCreateProject.bind(this);
    this.printDocument = this.printDocument.bind(this);
    this.toggleEditProject = this.toggleEditProject.bind(this);

    this.state = {
      modalCreateProject: false,
      modalEditProject: false,
      singleProjectObj: null,
    };
  }

  componentDidMount() {
    this.props.fetchAllProjectList();
  }

  toggleCreateProject = () => {
    this.setState({
      modalCreateProject: !this.state.modalCreateProject,
    });
  };

  toggleEditProject = () => {
    this.setState({
      modalEditProject: !this.state.modalEditProject,
    });
  };

  printDocument = () => {
    const doc = new jsPDF();
    var col = ["No", "Id", "Project Name", "Project Manager"];
    var rows = [];
    this.props.filterProjectList.forEach((element, index) => {
      var temp = [
        ++index,
        element._id,
        element.projectName,
        element.projectManager.name,
      ];
      rows.push(temp);
    });

    doc.autoTable(col, rows, { startY: 10 });
    doc.save("ProjectReport.pdf");
  };

  onRemoveProject(projectId) {
    this.props.deleteProject(
      projectId,
      () => {
        toast.success("Employee delete Success", {
          autoClose: 1000,
        });
      },
      () => {
        toast.error("Something went wrong", {
          autoClose: 1000,
        });
      }
    );
  }

  render() {
    return (
      <div className="card mt-5 boderRadiusCards">
        <div className="card-body">
          <div className="row">
            <ProjectTableHeader />
            <div className="col-md-9">
              <h5
                style={{
                  marginLeft: "20px",
                  marginTop: "10px",
                  fontSize: "20px",
                  fontFamily: "Orbitron",
                }}
              >
                {this.props.filterProjectList.length} Projects
              </h5>
            </div>
            <div className="col-md-3">
              <button
                className="btn sprintTableBtn"
                onClick={this.printDocument}
              >
                Generate Report
              </button>
              <button
                className="btn sprintTableBtn"
                onClick={this.toggleCreateProject}
              >
                Create
              </button>
            </div>
            <br />
            <br />
            <br />
            <hr />
            <br />
          </div>
          <table className="table table-hover">
            <tbody>
              {this.props.filterProjectList.map((singleProject) => {
                return (
                  <tr>
                    <td>
                      <h6>{singleProject._id}</h6>
                    </td>
                    <td>
                      <h6>{singleProject.projectName}</h6>
                    </td>
                    <td>
                      <h6>{singleProject.projectManager.name}</h6>
                    </td>
                    <td>
                      <button
                        className="btn empTableBtn"
                        style={{ backgroundColor: "#087E8B", color: "white" }}
                        onClick={() => {
                          this.setState({ singleProjectObj: singleProject });
                          this.toggleEditProject();
                        }}
                      >
                        <i class="bi bi-gear-fill"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger empTableBtn"
                        onClick={() => {
                          confirmAlert({
                            title: "Confirm to delete",
                            message:
                              "Are you sure you want to delete the project",
                            buttons: [
                              {
                                label: "Yes",
                                onClick: () =>
                                  this.onRemoveProject(singleProject._id),
                              },
                              // ,
                              // {
                              //   label: 'No',

                              // }
                            ],
                          });
                        }}
                      >
                        <i class="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <ToastContainer />
        {/* Modals Section */}

        {/* Create Project Modal */}
        <Modal
          isOpen={this.state.modalCreateProject}
          toggle={this.toggleCreateProject}
        >
          <ModalHeader toggle={this.toggleCreateProject}>
            CREATE A PROJECT
          </ModalHeader>
          <ModalBody>
            <AddProjectForm />
          </ModalBody>
        </Modal>

        {/* Edit Project Modal */}
        <Modal
          isOpen={this.state.modalEditProject}
          toggle={this.toggleEditProject}
        >
          <ModalHeader toggle={this.toggleEditProject}>
            EDIT PROJECT
          </ModalHeader>
          <ModalBody>
            <EditProjectForm singleProject={this.state.singleProjectObj} />
          </ModalBody>
        </Modal>

        {/* End of Modals Section */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filterProjectList: state.projectReducer.filterProjectList,
});

const mapActionToProps = {
  fetchAllProjectList: actions.fetchAllProjectList,
  deleteProject: actions.deleteProject,
};
export default connect(mapStateToProps, mapActionToProps)(AdminProjectsTable);
