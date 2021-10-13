const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
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
  profileImg: {
    type: String,
},
});

module.exports = Admin = mongoose.model("Admin", AdminSchema);
