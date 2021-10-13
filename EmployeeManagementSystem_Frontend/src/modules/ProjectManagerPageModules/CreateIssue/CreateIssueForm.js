import React, { Component } from "react";
import { Button, Form, Label, FormGroup, Input } from "reactstrap";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/SprintActions";
import * as employeeActions from "../../../store/actions/EmployeeActions";
import * as projectActions from "../../../store/actions/ProjectActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class CreateIssueForm extends Component {
  constructor(props) {
    super(props);
    this.onCreateIssue = this.onCreateIssue.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      issueName: "",
      description: "",
      points: "",
      assignee:"",
      estimatedTime: "",
      existEmpArray:[]
    };
  }
  componentDidMount() {
    let localArray = [];
    this.props.assignedEmpList.map((employee) => {
      localArray.push(employee._id);
    });
    this.setState({existEmpArray:localArray});
    this.props.fetchAllEmployeeList();
  }

  onCreateIssue(e) {
    e.preventDefault();

    const newIssue = {
      issueName: this.state.issueName,
      description: this.state.description,
      points: this.state.points,
      assignee: this.state.assignee,
      estimatedTime: this.state.estimatedTime,
    };
    this.props.createIssue(
      this.props.sprintId,
      newIssue,
      () => {
        this.props.fetchProjectById(this.props.projectId)
        document.getElementById("myForm").reset();
        toast.success("Issue Created", {
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

  onValueChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.onCreateIssue} id="myForm">
          <FormGroup className="mt-2">
            <Label for="issueName">Issue Name</Label>
            <Input
              type="text"
              name="issueName"
              id="issueName"
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
              onChange={(e) => {
                this.onValueChange(e);
              }}
            />
          </FormGroup>
          <FormGroup className="mt-2">
            <Label for="assignee">Assignee</Label>
            <Input
              type="select"
              name="assignee"
              id="assignee"
              onChange={(e) => {
                this.onValueChange(e);
              }}
            >
              <option>Select an assignee</option>
              {this.props.employeeList.map((emp) => {
                if(this.state.existEmpArray.includes(emp._id)){
                  return(
                    <option value={emp._id}>{emp.name}</option>
                  )
                }
              })}
            </Input>
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

const mapStateToProps = (state) => ({
  employeeList: state.employeeReducer.employeeList,
});

const mapActionToProps = {
  createIssue: actions.createIssue,
  fetchAllEmployeeList: employeeActions.fetchAllEmployeeList,
  fetchProjectById: projectActions.fetchProjectById,
};
export default connect(mapStateToProps, mapActionToProps)(CreateIssueForm);
