import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/ProjectManagerActions";
import "./PMTableHeader.css"

class PMTableHeader extends Component {
  constructor(props) {
    super(props);
    this.onValueChange = this.onValueChange.bind(this);
    this.checkProjectManagerByName = this.checkProjectManagerByName.bind(this);
    this.state = {
      name: "",
    };
  }

  async onValueChange(e) {
    await this.setState({ [e.target.name]: e.target.value });

    this.props.filterAllProjectManagers(
      this.props.projectManagerList.filter(this.checkProjectManagerByName)
    );
  }

  checkProjectManagerByName(list) {
    if (this.state.name !== "") {
      return list.name.toLowerCase().includes(this.state.name.toLowerCase());
    } else {
      return list;
    }
  }

  render() {
    return (
      <div>
        <div className="row SalaryManagementHeader">
          <div className="col-md-3 p-2">
            <div class="searchTab">
            <input
                type="text"
                placeholder="Search by name.."
                name="name"
                onChange={(e) => {
                  this.onValueChange(e);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  projectManagerList: state.projectManagerReducer.projectManagerList,
});

const mapActionToProps = {
  filterAllProjectManagers: actions.filterAllProjectManagers,
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(PMTableHeader);
