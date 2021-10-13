const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    mobileNumber: {
        type: String,
    },
    salary: {
        type: Number,
    },
    projectsList: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Project"
        }
    ],
    attendanceList: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Attendence"
        }
    ],
    department: {
        type: String,
    },
    rate: {
        type: Number,
    },
    commentList: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment"
        }
    ],
    profileImg: {
        type: String,
    },
    persistedFaceId:{
        type: String,
    },
    address: {
        type: String,
    },
});

module.exports = Employee = mongoose.model("Employee", EmployeeSchema);
