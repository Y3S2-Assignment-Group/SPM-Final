const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    projectName: {
        type: String,
    },
    descripton: {
        type: String,
    },
    projectManager: {
        type:Schema.Types.ObjectId,
        ref:"ProjectManager"
    },
    sprintList: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Sprint"
        }
    ],
    employeeList: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Employee"
        }
    ],
});

module.exports = Project = mongoose.model("Project", ProjectSchema);
