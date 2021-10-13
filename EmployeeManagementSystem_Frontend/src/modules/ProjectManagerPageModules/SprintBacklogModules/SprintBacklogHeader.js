import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import CreateSprintForm from "../CreateSprint/CreateSprintForm";

export default class SprintBacklogHeader extends Component {
  constructor(props) {
    super(props);

    this.toggleCreateSprint = this.toggleCreateSprint.bind(this);

    this.state = {
      modalSprint: false,
    };
  }

  toggleCreateSprint = () => {
    this.setState({ modalSprint: !this.state.modalSprint });
  };

  render() {
    return (
      <div>
        <div className="row mt-5">
          <div className="col-lg-12">
            <h5>Sprint Backlog</h5>
            <button className="btn sprintTableBtn" onClick={this.toggleCreateSprint}>Create</button>
          </div>
        </div>
        {/* Modals Section */}

        {/* Create Issue Modal */}
        <Modal isOpen={this.state.modalSprint} toggle={this.toggleCreateSprint}>
          <ModalHeader toggle={this.toggleCreateSprint}>
            Create Sprint
          </ModalHeader>
          <ModalBody>
            <CreateSprintForm projectId={this.props.projectId} />
          </ModalBody>
        </Modal>
        {/* End of Modals Section */}
      </div>
    );
  }
}
