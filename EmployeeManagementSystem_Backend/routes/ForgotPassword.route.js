const express = require("express");
const router = express.Router();

const {
    generateResetTokenForEmployee,resetEmployeePassword,resetProjectManagerPassword,resetAdminPassword
} = require("../controllers/ForgotPassword.controller");

router.post("/emp", generateResetTokenForEmployee);
router.put("/resetemppwd", resetEmployeePassword);
router.put("/resetpmpwd", resetProjectManagerPassword);
router.put("/resetadminpwd", resetAdminPassword);

module.exports = router;