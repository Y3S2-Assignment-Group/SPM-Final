const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport")
const ForgotPassword = require("../models/ForgotPassword.model");
const bcrypt = require("bcryptjs");
const Employee = require("../models/Employee.model");
const ProjectManager = require("../models/ProjectManager.model");
const Admin = require("../models/Admin.model");

const generateResetTokenForEmployee = async (req, res) => {
  const { email } = req.body;

  const existForgotEmail = await ForgotPassword.findOne({
    email: req.body.email,
  });

  //check the resetKey already exist
  if (existForgotEmail != null) {
    await ForgotPassword.findOneAndDelete({ email: req.body.email });
  }

  //generate a resetKey
  const resetKey = Math.floor(Math.random() * 100000 + 1);

  try {
    //create a user instance
    const forgotPasswordObj = new ForgotPassword({
      email,
      resetKey,
    });

    //check emails is exist
    let employee = await Employee.findOne({ email: req.body.email });
    if (employee == null) {
      employee = await ProjectManager.findOne({ email: req.body.email });
    }
    if (employee == null) {
      employee = await Admin.findOne({ email: req.body.email });
    }

    if (employee != null) {
      //save user to the database
      await forgotPasswordObj.save().then(() => {
        sendMail(req.body.email, resetKey).then(() => {
          return res.status(200).send("Email Sent");
        });
      });
    } else {
      return res.status(500).send("No User Found from this email");
    }
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(email, resetKey) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: "y3s2assignmentgroupsliit@gmail.com", // generated ethereal user
      pass: "y3s21998", // generated ethereal password
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "Employee Management System", // sender address
    to: email, // list of receivers
    subject: "Reset Password", // Subject line
    text: "Hello " + email, // plain text body
    html: `Your Reset Key : <b>${resetKey}</b>`, // html body
  });

  return info.response;
}

//Update Employee Password
const resetEmployeePassword = async (req, res) => {
  const { resetKey } = req.body;
  ForgotPassword.findOne({ email: req.body.email }).then(
    async (forgotPassword) => {
      if (forgotPassword.resetKey == resetKey) {
        try {
          const user = await Employee.findOne({ email: req.body.email });
          if (user != null) {
            Employee.findByIdAndUpdate(user._id).then(async (userProfile) => {
              if (req.body.password) {
                //Encrypt Password
                //10 is enogh..if you want more secured.user a value more than 10
                const salt = await bcrypt.genSalt(10);
                //hashing password

                userProfile.password = await bcrypt.hash(
                  req.body.password,
                  salt
                );
              }
              userProfile
                .save()
                .then(() => res.json("Password Reset successfully"))
                .catch((err) => res.status(400).json("Error: " + err));
            });
          }
        } catch (err) {
          //Something wrong with the server
          console.error(err.message);
          return res.status(500).send("Server Error");
        }
      }
    }
  );
};

//Update Project Manager Password
const resetProjectManagerPassword = async (req, res) => {
  const { resetKey } = req.body;
  ForgotPassword.findOne({ email: req.body.email }).then(
    async (forgotPassword) => {
      if (forgotPassword.resetKey == resetKey) {
        try {
          const user = await ProjectManager.findOne({ email: req.body.email });
          if (user != null) {
            ProjectManager.findByIdAndUpdate(user._id).then(
              async (userProfile) => {
                if (req.body.password) {
                  //Encrypt Password
                  //10 is enogh..if you want more secured.user a value more than 10
                  const salt = await bcrypt.genSalt(10);
                  //hashing password

                  userProfile.password = await bcrypt.hash(
                    req.body.password,
                    salt
                  );
                }
                userProfile
                  .save()
                  .then(() => res.json("Password Reset successfully"))
                  .catch((err) => res.status(400).json("Error: " + err));
              }
            );
          }
        } catch (err) {
          //Something wrong with the server
          console.error(err.message);
          return res.status(500).send("Server Error");
        }
      }
    }
  );
};

//Update Admin Password
const resetAdminPassword = async (req, res) => {
  const { resetKey } = req.body;
  ForgotPassword.findOne({ email: req.body.email }).then(
    async (forgotPassword) => {
      if (forgotPassword.resetKey == resetKey) {
        try {
          const user = await Admin.findOne({ email: req.body.email });
          if (user != null) {
            Admin.findByIdAndUpdate(user._id).then(
              async (userProfile) => {
                if (req.body.password) {
                  //Encrypt Password
                  //10 is enogh..if you want more secured.user a value more than 10
                  const salt = await bcrypt.genSalt(10);
                  //hashing password

                  userProfile.password = await bcrypt.hash(
                    req.body.password,
                    salt
                  );
                }
                userProfile
                  .save()
                  .then(() => res.json("Password Reset successfully"))
                  .catch((err) => res.status(400).json("Error: " + err));
              }
            );
          }
        } catch (err) {
          //Something wrong with the server
          console.error(err.message);
          return res.status(500).send("Server Error");
        }
      }
    }
  );
};

module.exports = {
  sendMail,
  generateResetTokenForEmployee,
  resetEmployeePassword,
  resetProjectManagerPassword,
  resetAdminPassword
};
