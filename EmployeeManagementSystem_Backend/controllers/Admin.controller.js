const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin.model");
const jwt = require("jsonwebtoken");
const config = require("config");

//get Admin details
const getAdminDetails = async (req, res) => {
  try {
    //get user details
    //-password : dont return the pasword
    const user = await Admin.findById(req.user.id).select("-password");
    res.json(user);
  } catch {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//Authenticate admin and get token
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    //See if user Exist
    let user = await Admin.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    //match the user email and password

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    //Return jsonwebtoken

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

//Register admin
const registerAdmin = async (req, res) => {
  const { name, username, email, password, mobileNumber } = req.body;
  
  try {
    //See if user Exist
    let user = await Admin.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "Admin already exist" }] });
    }

    const profileImg = "https://firebasestorage.googleapis.com/v0/b/econnecteee.appspot.com/o/profileImg.jpg?alt=media&token=46df70d2-9365-4a45-af63-b21c44585f9c"

    //create a user instance
    user = new Admin({
      name,
      username,
      email,
      password,
      mobileNumber,
      profileImg
    });

    //Encrypt Password

    //10 is enogh..if you want more secured.user a value more than 10
    const salt = await bcrypt.genSalt(10);

    //hashing password
    user.password = await bcrypt.hash(password, salt);

    //save user to the database
    await user.save();

    //Return jsonwebtoken

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

module.exports = { getAdminDetails, loginAdmin, registerAdmin };
