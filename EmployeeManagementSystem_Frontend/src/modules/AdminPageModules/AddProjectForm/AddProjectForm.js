import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/ProjectActions";
import * as pmActions from "../../../store/actions/ProjectManagerActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Label, Form, FormGroup, Input } from "reactstrap";

class AddProjectForm extends Component {
  constructor(props) {
    super(props);
    this.onAddProject = this.onAddProject.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      projectName: null,
      descripton: null,
      projectManager: null,
    };
  }

  componentDidMount(){
    this.props.fetchAllProjectManagersList();
  }

  onValueChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onAddProject(e) {
    e.preventDefault();
    const newProjectObj = {
      projectName: this.state.projectName,
      descripton: this.state.descripton,
      projectManager:  this.state.projectManager,
    };
    this.props.addProject(
      newProjectObj,
      () => {
        document.getElementById("myForm").reset();
        this.props.fetchAllProjectList()
        toast.success("Project Created", {
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
      <div>
        <Form onSubmit={this.onAddProject} id="myForm">
          <FormGroup className="mt-2">
            <Label for="projectName">Project Name</Label>
            <Input
              type="text"
              name="projectName"
              id="projectName"
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
          <FormGroup className="mt-2">
            <Label for="descripton">Description</Label>
            <Input
              type="textarea"
              name="descripton"
              id="descripton"
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
          <FormGroup className="mt-2">
            <Label for="projectManagerId">Project Manager</Label>
            <Input
              type="select"
              name="projectManager"
              id="projectManager"
              onChange={(e) => {
                this.onValueChange(e);
              }}
            >
              <option>Select an assignee</option>
              {this.props.projectManagerList.map((singleProjectManager)=>{
                return(
                  <option value={singleProjectManager._id} >{singleProjectManager.name}</option>
                )
              })}

            </Input>
          </FormGroup>
          <FormGroup className="mt-2">
            <Button className="mt-2 modalCreateBtn">CREATE</Button>
          </FormGroup>
        </Form>
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  projectManagerList: state.projectManagerReducer.projectManagerList,
});

const mapActionToProps = {
  addProject: actions.addProject,
  fetchAllProjectList: actions.fetchAllProjectList,
  fetchAllProjectManagersList:pmActions.fetchAllProjectManagersList
};
export default connect(mapStateToProps, mapActionToProps)(AddProjectForm);
