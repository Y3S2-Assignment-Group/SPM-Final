const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getEmployeeDetails,
  loginEmployee,
  registerEmployee,
  updateEmployeeProfile,
  deleteEmployee,
  getAllEmployeesList,
  confirmEmployeeFaceAuthentication,
  confirmInTime,
  confirmOutTime,
  loginEmployeeWithFaceAuthetication,
  getEmployeeDetailsById
} = require("../controllers/Employee.controller");

router.put("/confirmouttime/:attendenceId",confirmOutTime);
router.put("/confirmintime/:userid",confirmInTime);
router.get("/confirmface/:persistedFaceId",confirmEmployeeFaceAuthentication);
router.get("/all",getAllEmployeesList);
router.post("/register", registerEmployee);
router.post("/login", loginEmployee);
router.post("/loginwithfaceauth", loginEmployeeWithFaceAuthetication);
router.get("/", auth, getEmployeeDetails);
router.put("/updateprofile/:id", updateEmployeeProfile);
router.get("/:id", getEmployeeDetailsById);
router.delete("/:id", deleteEmployee);

module.exports = router;
