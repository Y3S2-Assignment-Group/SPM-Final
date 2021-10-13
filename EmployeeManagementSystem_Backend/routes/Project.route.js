const express = require("express");
const router = express.Router();

const {
    getAllProjects,getProjectDetails, createProject ,updateProject ,addEmployeeToProject ,addSprintToProject,deleteProject
} = require("../controllers/Project.controller");

router.get("/all",getAllProjects);
router.post("/", createProject);
router.get("/:id", getProjectDetails);
router.put("/:id", updateProject);
router.put("/addemp/:id", addEmployeeToProject);
router.put("/addsprint/:id", addSprintToProject);
router.delete("/:id",deleteProject);

module.exports = router;