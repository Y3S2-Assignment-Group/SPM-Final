import React, { Component } from 'react'
import { Button, Form, Label, FormGroup, Input } from "reactstrap";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/IssueActions";
import * as projectActions from "../../../store/actions/ProjectActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class EditIssueForm extends Component {

  constructor(props) {
    super(props);
    this.onEditIssue = this.onEditIssue.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      issueId:this.props.editIssueObj._id,
      issueName: this.props.editIssueObj.issueName,
      description:this.props.editIssueObj.description,
      points:this.props.editIssueObj.points,
      estimatedTime:this.props.editIssueObj.estimatedTime,
    };
  }

  onEditIssue(e) {
    e.preventDefault();

    const newIssue = {
      issueName: this.state.issueName,
      description: this.state.description,
      points: this.state.points,
      estimatedTime: this.state.estimatedTime,
    };
    this.props.editIssue(
      this.state.issueId,
      newIssue,
      () => {
        this.props.fetchProjectById(this.props.projectId)
        toast.success("Issue Edited", {
          autoClose: 2000,
        });
      },
      () => {
        this.props.fetchProjectById(this.props.projectId)
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
        <Form onSubmit={this.onEditIssue}>
          <FormGroup className="mt-2">
            <Label for="issueName">Issue Name</Label>
            <Input
              type="text"
              name="issueName"
              id="issueName"
              value={this.state.issueName}
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
          <FormGroup className="mt-2">
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              value={this.state.description}
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
          <FormGroup className="mt-2">
            <Label for="points">Points</Label>
            <Input
              type="number"
              name="points"
              id="points"
              value={this.state.points}
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
          <FormGroup className="mt-2">
            <Label for="estimatedTime">Estimated Dates</Label>
            <Input
              type="number"
              name="estimatedTime"
              id="estimatedTime"
              value={this.state.estimatedTime}
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
  editIssue: actions.editIssue,
  fetchProjectById: projectActions.fetchProjectById,
};
export default connect(null, mapActionToProps)(EditIssueForm);
