const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AttendenceSchema = new Schema({
    inTime: {
        type: String,
    },
    outTime: {
        type: String,
    },
    date: {
        type: String,
    }
});

module.exports = Attendence = mongoose.model("Attendence", AttendenceSchema);
