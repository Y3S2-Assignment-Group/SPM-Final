import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button, Form, Label, FormGroup, Input } from "reactstrap";
import WebcamValidator from "./WebcamValidator";
import WebcamValidatorOutTime from "./WebcamValidatorOutTime"
import { connect } from "react-redux";
import * as actions from "../../../store/actions/EmployeeActions";

class MarkAttendenceForm extends Component {
  constructor(props) {
    super(props);

    this.toggleCheckByWebcamInTime = this.toggleCheckByWebcamInTime.bind(this);
    this.toggleCheckByWebcamOutTime =
      this.toggleCheckByWebcamOutTime.bind(this);

    this.state = {
      modalCheckByWebcamInTime: false,
      modalCheckByWebcamOutTime: false,
      selectedDate:new Date()
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.singleEmployee !== nextProps.singleEmployee) {
      this.props.fetchEmployee();
    }
  }

  toggleCheckByWebcamInTime = () => {
    this.setState({
      modalCheckByWebcamInTime: !this.state.modalCheckByWebcamInTime,
    });
  };

  toggleCheckByWebcamOutTime = () => {
    this.setState({
      modalCheckByWebcamOutTime: !this.state.modalCheckByWebcamOutTime,
    });
  };

  render() {
    return (
      <div>
        <div className="card boderRadiusCards">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-12">
                    <Calendar
                      onChange={(value) => {
                        this.setState({selectedDate:value})
                      }}
                      value={this.state.selectedDate}
                    />
                  </div>
                  <div className="col-md-12">
                    <Form>
                      <FormGroup className="mt-2">
                        <Label for="inTime">In Time</Label>
                        <Input type="text" name="inTime" id="inTime" value={this.props.singleEmployee && this.props.singleEmployee.attendanceList.length > 0 ? this.props.singleEmployee.attendanceList[0].inTime : ""} disabled />
                      </FormGroup>
                      <FormGroup className="mt-2">
                        <Button
                          className="mt-2 modalCreateBtn"
                          onClick={this.toggleCheckByWebcamInTime}
                        >
                          ADD
                        </Button>
                      </FormGroup>
                    </Form>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-12">
                    <Calendar />
                  </div>
                  <div className="col-md-12">
                    <Form>
                      <FormGroup className="mt-2">
                        <Label for="outTime">Out Time</Label>
                        <Input type="text" name="outTime" id="outTime" value={this.props.singleEmployee &&  this.props.singleEmployee.attendanceList.length > 0 ? this.props.singleEmployee.attendanceList[0].outTime : ""} disabled  />
                      </FormGroup>
                      <FormGroup className="mt-2">
                        <Button
                          className="mt-2 modalCreateBtn"
                          onClick={this.toggleCheckByWebcamOutTime}
                        >
                          ADD
                        </Button>
                      </FormGroup>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modals Section */}

        {/* Check In-Time By Webcam Modal */}
        <Modal
          isOpen={this.state.modalCheckByWebcamInTime}
          toggle={this.toggleCheckByWebcamInTime}
        >
          <ModalHeader toggle={this.toggleCheckByWebcamInTime}>
            CONFIRM IN TIME
          </ModalHeader>
          <ModalBody>
            <WebcamValidator selectedDate={this.state.selectedDate} timeSlot="IN TIME" />
          </ModalBody>
        </Modal>

        {/* Check Out-Time By Webcam Modal */}
        <Modal
          isOpen={this.state.modalCheckByWebcamOutTime}
          toggle={this.toggleCheckByWebcamOutTime}
        >
          <ModalHeader toggle={this.toggleCheckByWebcamOutTime}>
            CONFIRM OUT TIME
          </ModalHeader>
          <ModalBody>
            <WebcamValidatorOutTime timeSlot="OUT TIME" />
          </ModalBody>
        </Modal>

        {/* End of Modals Section */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  singleEmployee: state.employeeReducer.singleEmployee,
});

const mapActionToProps = {
  fetchEmployee: actions.fetchEmployee,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(MarkAttendenceForm);