import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/SprintActions";
import { Button, Form, Label, FormGroup, Input } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class EmployeeFeedbackForm extends Component {
  constructor(props) {
    super(props);
    this.onCreateFeedback = this.onCreateFeedback.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      sprint: "",
      team: "",
      tasks: "",
    };
  }

  onCreateFeedback(e) {
    e.preventDefault();

    const newFeedback = {
      feedback:
        this.state.sprint +
        ". " +
        this.state.team +
        ". " +
        this.state.tasks +
        ".",
    };
    this.props.addFeedback(
      this.props.sprintId,
      newFeedback,
      () => {
        document.getElementById("myForm").reset();
        toast.success("Feedback added", {
          autoClose: 2000,
        });
      },
      () => {
        toast.error("Something went wrong", {
          autoClose: 2000,
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
        <Form onSubmit={this.onCreateFeedback} id="myForm">
          <FormGroup className="mt-2">
            <Label for="sprint">About the Sprint</Label>
            <Input
              type="textarea"
              name="sprint"
              id="sprint"
              onChange={(e) => {
                this.onValueChange(e);
              }}
              required
            />
          </FormGroup>
          <FormGroup className="mt-2">
            <Label for="team">About the Team</Label>
            <Input
              type="textarea"
              name="team"
              id="team"
              onChange={(e) => {
                this.onValueChange(e);
              }}
              required
            />
          </FormGroup>
          <FormGroup className="mt-2">
            <Label for="tasks">About Tasks</Label>
            <Input
              type="textarea"
              name="tasks"
              id="tasks"
              onChange={(e) => {
                this.onValueChange(e);
              }}
              required
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
  addFeedback: actions.addFeedback,
};

export default connect(null, mapActionToProps)(EmployeeFeedbackForm);
