import axios from "axios";
import React, { Component } from "react";
import ProjectAnalysisModal from "./ProjectAnalysisModal";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

export default class FeebackTable extends Component {
  constructor(props) {
    super(props);
    this.generateFeedbackAnalysis = this.generateFeedbackAnalysis.bind(this);
    this.state = {
      sprintList: this.props.sprints,
      modalFeedbackAnalysis: false,
      feedbackAnalysis:null,
      sprintAnalysisArray:[],
      teamAnalysisArray:[],
      tasksAnalysisArray:[]
    };
  }

  toggleFeedbackAnalysis = () => {
    this.setState({
      modalFeedbackAnalysis: !this.state.modalFeedbackAnalysis,
    });
  };

  generateFeedbackAnalysis = async (feedbacks) => {
    console.log(feedbacks);

    const analysisObject = {
      documents: await feedbacks.map((singleFeedback, key) => {
        return {
          language: "en",
          id: ++key,
          text: singleFeedback.feedback,
        };
      }),
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": "48456715e0ea4779834b1e427017c247",
      },
    };
    console.log(analysisObject);

    await axios
      .post(
        "https://eastus.api.cognitive.microsoft.com/text/analytics/v3.0/sentiment?showStats=true",
        analysisObject,
        config
      )
      .then(async (response) => {
        console.log(response.data);
        this.setState({feedbackAnalysis:response.data})
        let sprintArray = [];
        let teamArray = [];
        let tasksArray = [];
    
        await response.data.documents.forEach((singleDocument) => {
          singleDocument.sentences.forEach((singleSentence, key) => {
            if (key === 0) {
              sprintArray.push(singleSentence.sentiment);
            }
            if (key == 1) {
              teamArray.push(singleSentence.sentiment);
            }
            if (key == 2) {
              tasksArray.push(singleSentence.sentiment);
            }
          });
        });
    
        await this.setState({sprintAnalysisArray:sprintArray,teamAnalysisArray:teamArray,tasksAnalysisArray:tasksArray})

        this.toggleFeedbackAnalysis();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <div className="row mt-5 mb-5">
          <h1 className="text-center">Feedback Overview</h1>

          {this.state.sprintList.map((singleSprint) => {
            return (
              <div className="col-md-12 mt-2">
                <div className="card mt-3 boderRadiusCards">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <h3>Sprint</h3>
                        <h5>
                          {singleSprint.fromDate.substring(0, 10) +
                            " - " +
                            singleSprint.toDate.substring(0, 10)}
                        </h5>
                        <button
                          className="btn sprintTableBtn"
                          onClick={() => {
                            this.generateFeedbackAnalysis(
                              singleSprint.feedbackList
                            );
                          }}
                        >
                          Analyze
                        </button>
                      </div>
                    </div>
                    <table className="table table-hover">
                      <tbody>
                        {singleSprint.feedbackList.map(
                          (singleFeedback, index) => {
                            return (
                              <tr>
                                <th scope="row">#{++index}</th>
                                <td>{singleFeedback.feedback}</td>
                                <td>
                                  <button className="btn btn-danger empTableBtn">
                                    <i class="bi bi-trash-fill"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Modals Section */}

        <Modal
          isOpen={this.state.modalFeedbackAnalysis}
          toggle={this.toggleFeedbackAnalysis}
        >
          <ModalHeader toggle={this.toggleFeedbackAnalysis}>
            FEEDBACK ANALYSIS
          </ModalHeader>
          <ModalBody>
            <ProjectAnalysisModal feedbackAnalysis={this.state.feedbackAnalysis} tasksAnalysisArray={this.state.tasksAnalysisArray} teamAnalysisArray={this.state.teamAnalysisArray} sprintAnalysisArray={this.state.sprintAnalysisArray} />
          </ModalBody>
        </Modal>

        {/* End of Modals Section */}
      </div>
    );
  }
}
