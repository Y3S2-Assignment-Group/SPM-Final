import React, { Component } from "react";
import "./SprintTable.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import CreateIssueForm from "../CreateIssue/CreateIssueForm";
import FeedbackForm from "../Feedback/FeedbackForm/FeedbackForm";

export default class SprintTable extends Component {
  constructor(props) {
    super(props);

    this.toggleCreateIssue = this.toggleCreateIssue.bind(this);
    this.toggleFeedbackForm = this.toggleFeedbackForm.bind(this);

    this.state = {
      modalCreateIssue: false,
      modalFeedbackForm: false,
    };
  }

  toggleCreateIssue = () => {
    this.setState({ modalCreateIssue: !this.state.modalCreateIssue });
  };

  toggleFeedbackForm = () => {
    this.setState({ modalFeedbackForm: !this.state.modalFeedbackForm });
  };

  render() {
    return (
      <div className="card mt-3 boderRadiusCards">
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <h5>42 Issues</h5>
              <p className="text-muted">
                29/jul/21 9.20 AM - 12/Aug/21 9.20 AM
              </p>
            </div>
            <div className="col-md-4">
              <button className="btn sprintTableBtn" onClick={this.toggleFeedbackForm}>Feedback</button>
              <button className="btn sprintTableBtn">Analyze</button>
              <button
                className="btn sprintTableBtnPlus"
                onClick={this.toggleCreateIssue}
              >
                <i class="bi bi-plus-circle-fill"></i>
              </button>
            </div>

            <hr />
          </div>
          <table className="table table-hover">
            <tbody>
              <tr>
                <th scope="row">
                  <i class="bi bi-check-square-fill text-success"></i>
                </th>
                <td>Implement the Login UI</td>
                <td>Senura Jayadeva</td>
                <td>
                  <img
                    className="img-fluid rounded-circle employeeImage"
                    src="https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"
                    alt="profile image1"
                  />
                </td>
                <td>
                  <button className="btn btn-primary empTableBtn">
                    <i class="bi bi-gear-fill"></i>
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger empTableBtn">
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <i class="bi bi-check-square-fill text-success"></i>
                </th>
                <td>Implement the Login UI</td>
                <td>Senura Jayadeva</td>
                <td>
                  <img
                    className="img-fluid rounded-circle employeeImage"
                    src="https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"
                    alt="profile image2"
                  />
                </td>
                <td>
                  <button className="btn btn-primary empTableBtn">
                    <i class="bi bi-gear-fill"></i>
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger empTableBtn">
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <i class="bi bi-check-square-fill text-success"></i>
                </th>
                <td>Implement the Login UI</td>
                <td>Senura Jayadeva</td>
                <td>
                  <img
                    className="img-fluid rounded-circle employeeImage"
                    src="https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"
                    alt="profile image3"
                  />
                </td>
                <td>
                  <button className="btn btn-primary empTableBtn">
                    <i class="bi bi-gear-fill"></i>
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger empTableBtn">
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <i class="bi bi-exclamation-square-fill text-danger"></i>
                </th>
                <td>Implement the Login UI</td>
                <td>Senura Jayadeva</td>
                <td>
                  <img
                    className="img-fluid rounded-circle employeeImage"
                    src="https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"
                    alt="profile image4"
                  />
                </td>
                <td>
                  <button className="btn btn-primary empTableBtn">
                    <i class="bi bi-gear-fill"></i>
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger empTableBtn">
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <i class="bi bi-exclamation-square-fill text-danger"></i>
                </th>
                <td>Implement the Login UI</td>
                <td>Senura Jayadeva</td>
                <td>
                  <img
                    className="img-fluid rounded-circle employeeImage"
                    src="https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"
                    alt="profile image5"
                  />
                </td>
                <td>
                  <button className="btn btn-primary empTableBtn">
                    <i class="bi bi-gear-fill"></i>
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger empTableBtn">
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <i class="bi bi-exclamation-square-fill text-danger"></i>
                </th>
                <td>Implement the Login UI</td>
                <td>Senura Jayadeva</td>
                <td>
                  <img
                    className="img-fluid rounded-circle employeeImage"
                    src="https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"
                    alt="profile image6"
                  />
                </td>
                <td>
                  <button className="btn btn-primary empTableBtn">
                    <i class="bi bi-gear-fill"></i>
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger empTableBtn">
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Modals Section */}

        {/* Create Issue Modal */}
        <Modal
          isOpen={this.state.modalCreateIssue}
          toggle={this.toggleCreateIssue}
        >
          <ModalHeader toggle={this.toggleCreateIssue}>
            Create Issue
          </ModalHeader>
          <ModalBody>
            <CreateIssueForm />
          </ModalBody>
        </Modal>

        {/* Create Feedback form Modal */}
        <Modal
          isOpen={this.state.modalFeedbackForm}
          toggle={this.toggleFeedbackForm}
        >
          <ModalHeader toggle={this.toggleFeedbackForm}>
            Add Feedback
          </ModalHeader>
          <ModalBody>
            <FeedbackForm />
          </ModalBody>
        </Modal>

        {/* End of Modals Section */}
      </div>
    );
  }
}
