const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getAdminDetails,
  loginAdmin,
  registerAdmin,
} = require("../controllers/Admin.controller");


router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/", auth, getAdminDetails);

module.exports = router;
