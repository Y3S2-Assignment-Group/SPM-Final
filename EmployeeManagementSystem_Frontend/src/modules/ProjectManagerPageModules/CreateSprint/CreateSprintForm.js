import React, { Component } from "react";
import { Button, Form, Label, FormGroup, Input } from "reactstrap";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/ProjectActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class CreateSprintForm extends Component {
  constructor(props) {
    super(props);
    this.onCreateSprint = this.onCreateSprint.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      fromDate: "",
      toDate: "",
    };
  }

  onCreateSprint(e) {
    e.preventDefault();

    const newSprint = {
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
    };

    this.props.addSprintToProject(
      this.props.projectId,
      newSprint,
      () => {
        this.props.fetchProjectById(this.props.projectId);
        document.getElementById("myForm").reset();
        toast.success("Sprint created", {
          autoClose: 2500,
        });
      },
      () => {
        toast.error("Something went wrong", {
          autoClose: 2500,
        });
      }
    );
  }

  onValueChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.onCreateSprint} id="myForm">
          <FormGroup className="mt-2">
            <Label for="fromDate">Start Date</Label>
            <Input
              type="date"
              name="fromDate"
              id="fromDate"
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
          <FormGroup className="mt-2">
            <Label for="toDate">End Date</Label>
            <Input
              type="date"
              name="toDate"
              id="toDate"
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
          <FormGroup className="mt-2">
            <Button className="mt-2 modalCreateBtn">ADD</Button>
          </FormGroup>
        </Form>
        <ToastContainer />
      </div>
    );
  }
}

const mapActionToProps = {
  addSprintToProject: actions.addSprintToProject,
  fetchProjectById : actions.fetchProjectById
};

export default connect(null, mapActionToProps)(CreateSprintForm);
