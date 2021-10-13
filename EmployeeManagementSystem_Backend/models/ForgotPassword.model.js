const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ForgotPasswordSchema = new Schema({
    email: {
        type: String,
    },
    resetKey: {
        type: String,
    },
});

module.exports = ForgotPassword = mongoose.model("ForgotPassword", ForgotPasswordSchema);
