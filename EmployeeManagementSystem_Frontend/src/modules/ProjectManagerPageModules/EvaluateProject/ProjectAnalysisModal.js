import React, { Component } from "react";
import { FaSmile, FaSadTear } from "react-icons/fa";
import { RiEmotionNormalFill } from "react-icons/ri";
import "./ProjectAnalysisModal.css"

export default class ProjectAnalysisModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sprintAnalysisArray: this.props.sprintAnalysisArray,
      teamAnalysisArray: this.props.teamAnalysisArray,
      tasksAnalysisArray: this.props.tasksAnalysisArray,
      sprintOverview: null,
      teamOverview: null,
      taskOverview: null,
    };
  }

  componentDidMount() {
    if (this.props.sprintAnalysisArray != null) {
      let countsprintAnalysis = 0;

      this.state.sprintAnalysisArray.forEach((item) => {
        if (item === "positive") {
          countsprintAnalysis++;
        } else if (item === "negative") {
          countsprintAnalysis--;
        }
      });

      if (countsprintAnalysis > 0) {
        this.setState({ sprintOverview: "Positive" });
      } else if (countsprintAnalysis == 0) {
        this.setState({ sprintOverview: "Medium" });
      } else {
        this.setState({ sprintOverview: "Negative" });
      }
      console.log("sprint : " + this.state.sprintAnalysisArray);
      console.log("sprint count : " + countsprintAnalysis);
    }

    if (this.props.teamAnalysisArray != null) {
      let countteamAnalysis = 0;

      this.state.teamAnalysisArray.forEach((item) => {
        if (item === "positive") {
          countteamAnalysis++;
        } else if (item === "negative") {
          countteamAnalysis--;
        }
      });

      if (countteamAnalysis > 0) {
        this.setState({ teamOverview: "Positive" });
      } else if (countteamAnalysis == 0) {
        this.setState({ teamOverview: "Medium" });
      } else {
        this.setState({ teamOverview: "Negative" });
      }
      console.log("sprint : " + this.state.sprintAnalysisArray);
      console.log("team count : " + countteamAnalysis);
    }

    if (this.props.tasksAnalysisArray != null) {
      let counttasksAnalysis = 0;

      this.state.tasksAnalysisArray.forEach((item) => {
        if (item === "positive") {
          counttasksAnalysis++;
        } else if (item === "negative") {
          counttasksAnalysis--;
        }
      });

      if (counttasksAnalysis > 0) {
        this.setState({ taskOverview: "Positive" });
      } else if (counttasksAnalysis == 0) {
        this.setState({ taskOverview: "Neutral" });
      } else {
        this.setState({ taskOverview: "Negative" });
      }

      console.log("task count : " + counttasksAnalysis);
    }
  }

  render() {
    return (
      <div>
        <div className="row mt-2">
          <div className="col-md-4 text-center">
            {this.state.sprintOverview == "Positive" ? (
              <FaSmile className="feedbackicon smileicon" />
            ) : this.state.sprintOverview == "Negative" ? (
              <FaSadTear className="feedbackicon sadicon" />
            ) : (
              <RiEmotionNormalFill className="feedbackicon neutralicon" />
            )}
            <h6> Sprint</h6>
          </div>
          <div className="col-md-4 text-center">
            {this.state.teamOverview == "Positive" ? (
              <FaSmile className="feedbackicon smileicon" />
            ) : this.state.teamOverview == "Negative" ? (
              <FaSadTear className="feedbackicon sadicon" />
            ) : (
              <RiEmotionNormalFill className="feedbackicon neutralicon"/>
            )}
            <h6> Team</h6>
          </div>
          <div className="col-md-4 text-center">
            {this.state.taskOverview == "Positive" ? (
              <FaSmile className="feedbackicon smileicon" />
            ) : this.state.taskOverview == "Negative" ? (
              <FaSadTear className="feedbackicon sadicon" />
            ) : (
              <RiEmotionNormalFill className="feedbackicon neutralicon"/>
            )}
            <h6> Tasks</h6>
          </div>
        </div>
        <div className="mt-3">
          <table className="table table-hover">
            <thead>
              <tr className="empTableHeader">
                <th scope="col">No</th>
                <th scope="col">Sprint</th>
                <th scope="col">Team</th>
                <th scope="col">Tasks</th>
                <th scope="col">Overall</th>
              </tr>
            </thead>
            <tbody>
              {this.props.feedbackAnalysis &&
                this.props.feedbackAnalysis.documents.map(
                  (singleDocument, index) => {
                    return (
                      <tr>
                        <th scope="row">#{++index}</th>
                        {singleDocument.sentences.map((singleSentence) => {
                          return <td>{singleSentence.sentiment}</td>;
                        })}

                        <td>{singleDocument.sentiment}</td>
                      </tr>
                    );
                  }
                )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
