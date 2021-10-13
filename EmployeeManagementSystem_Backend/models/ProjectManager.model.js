const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectManagerSchema = new Schema({
    name: {
        type: String,
    },
    profileImg:{
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
    address: {
        type: String,
    },
    salary: {
        type: Number,
    },
    rate: {
        type: Number,
    },
    profileImg: {
        type: String,
    },
    persistedFaceId:{
        type: String,
    },
    commentList: [{
        type:Schema.Types.ObjectId,
        ref:"Comment"
    }],
    projectsList: [{
        type:Schema.Types.ObjectId,
        ref:"Project"
    }],
    attendanceList: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Attendance"
        }
    ],
});

module.exports = ProjectManager = mongoose.model("ProjectManager", ProjectManagerSchema);
