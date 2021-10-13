const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
    issueName: {
        type: String,
    },
    description: {
        type: String,
    },
    points: {
        type: Number,
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: "Employee"
    },
    progress: {
        type: String
    },
    estimatedTime: {
        type: Number
    }
});

module.exports = Issue = mongoose.model("Issue", IssueSchema);
