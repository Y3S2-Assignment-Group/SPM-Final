const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    feedback: {
        type: String,
    }
});

module.exports = Feedback = mongoose.model("Feedback", FeedbackSchema);
