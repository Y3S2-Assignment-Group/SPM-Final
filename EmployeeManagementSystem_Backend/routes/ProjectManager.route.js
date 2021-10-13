const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
    getProjectManagerDetails, loginProjectManager, registerProjectManager, updateProjectManagerProfile, getAllProjectManagerList, deleteProjectManager, confirmPMFaceAuthentication,
    confirmInTime,
    confirmOutTime,
    loginProjectManagerWithFaceAuthetication
} = require("../controllers/ProjectManager.controller");

router.put("/confirmouttime/:attendenceId", confirmOutTime);
router.put("/confirmintime/:userid", confirmInTime);
router.get("/confirmface/:persistedFaceId", confirmPMFaceAuthentication);
router.get("/all", getAllProjectManagerList)
router.post("/register", registerProjectManager);
router.post("/loginwithfaceauth", loginProjectManagerWithFaceAuthetication);
router.post("/login", loginProjectManager);
router.get("/", auth, getProjectManagerDetails);
router.delete("/:id", deleteProjectManager);
router.put("/updateprofile/:id", updateProjectManagerProfile);

module.exports = router;
