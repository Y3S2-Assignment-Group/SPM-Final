const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment: {
        type: String,
    },
    projectManager: {
        type:Schema.Types.ObjectId,
        ref:"ProjectManager"
    },
    employee:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Employee"
    }
});

module.exports = Comment = mongoose.model("Comment", CommentSchema);
