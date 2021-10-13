const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SprintSchema = new Schema({
    fromDate: {
        type: Date,
    },
    toDate: {
        type: Date,
    },
    isClosed: {
        type: Boolean,
    },
    toDoList: [{
        type:Schema.Types.ObjectId,
        ref:"Issue"
    }],
    inProgressList: [{
        type:Schema.Types.ObjectId,
        ref:"Issue"
    }],
    doneList: [{
        type:Schema.Types.ObjectId,
        ref:"Issue"
    }],
    feedbackList: [{
        type:Schema.Types.ObjectId,
        ref:"Feedback"
    }],

});

module.exports = Sprint = mongoose.model("Sprint", SprintSchema);
