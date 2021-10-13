import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/ProjectActions";
import { Button, Label, Form, FormGroup, Input } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class EditProjectForm extends Component {
  constructor(props) {
    super(props);
    this.onEditProject = this.onEditProject.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      projectId: this.props.singleProject._id,
      projectName: this.props.singleProject.projectName,
      descripton: this.props.singleProject.descripton,
    };
  }

  onValueChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onEditProject(e) {
    e.preventDefault();
    const updatedProjectObj = {
      projectName: this.state.projectName,
      descripton: this.state.descripton,
    };
    this.props.updateProject(
      this.state.projectId,
      updatedProjectObj,
      () => {
        this.props.fetchAllProjectList();
        toast.success("Project Updated", {
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
        <Form onSubmit={this.onEditProject}>
          <FormGroup className="mt-2">
            <Label for="projectName">Project Name</Label>
            <Input
              type="text"
              name="projectName"
              id="projectName"
              value={this.state.projectName}
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
              value={this.state.descripton}
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
          <FormGroup className="mt-2">
            <Button className="mt-2 modalCreateBtn">EDIT</Button>
          </FormGroup>
        </Form>
        <ToastContainer />
      </div>
    );
  }
}

const mapActionToProps = {
  updateProject: actions.updateProject,
  fetchAllProjectList: actions.fetchAllProjectList,
};

export default connect(null, mapActionToProps)(EditProjectForm);
