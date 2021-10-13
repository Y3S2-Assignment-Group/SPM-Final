const Employee = require("../models/Employee.model");
const Project = require("../models/Project.model");
const Sprint = require("../models/Sprint.model");
const ProjectManager = require("../models/ProjectManager.model");
const Feedback = require("../models/Feedback.model");
const Issue = require("../models/Issue.model");

//get All Projects details
const getAllProjects = async (req, res) => {
  try {
    const project = await Project.find()
      .populate("projectManager", "_id name")
      .populate("employeeList", "_id name")
      .populate(
        "sprintList",
        "_id fromDate toDate isClosed toDoList inProgressList doneList"
      );
    res.json(project);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//get Project details
const getProjectDetails = async (req, res) => {
  try {
    //const project = await Project.findById(req.params.id).populate('projectManager', '_id name').populate('employeeList', '_id name').populate('sprintList', '_id fromDate toDate isClosed toDoList inProgressList doneList');
    const project = await Project.findById(req.params.id)
      .populate("projectManager", "_id name")
      .populate("employeeList", "_id name")
      .populate("sprintList", "_id fromDate toDate isClosed")
      .populate({
        path: "sprintList",
        populate: [
          {
            path: "toDoList",
            model: "Issue",
            populate: {
              path: "assignee",
              select: "name profileImg",
            },
          },
          {
            path: "inProgressList",
            model: "Issue",
            populate: {
              path: "assignee",
              select: "name profileImg",
            },
          },
          {
            path: "doneList",
            model: "Issue",
            populate: {
              path: "assignee",
              select: "name profileImg",
            },
          },
        ],
      })
      .populate({
        path: "sprintList",
        populate: {
          path: "feedbackList",
          model: "Feedback",
        },
      });
    res.json(project);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//Create a Project
const createProject = async (req, res) => {
  const { projectName, descripton, projectManager } = req.body;

  try {
    //create a user instance
    const project = new Project({
      projectName,
      descripton,
      projectManager,
    });

    //save user to the database
    await project
      .save()
      .then(async (createdProject) => {
        const projectManager = await ProjectManager.findById(
          createdProject.projectManager._id
        );
        projectManager.projectsList.unshift(createdProject);
        await projectManager.save();
        res.json(createdProject);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

//Update project
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project != null) {
      Project.findByIdAndUpdate(req.params.id).then(
        async (projectExistingProject) => {
          projectExistingProject.projectName = req.body.projectName;
          projectExistingProject.descripton = req.body.descripton;

          projectExistingProject
            .save()
            .then((response) => res.json(response))
            .catch((err) => res.status(400).json("Error: " + err));
        }
      );
    }
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

//Add Team Members To Project
const addEmployeeToProject = async (req, res) => {
  const { employee } = req.body;
  try {
    const project = await Project.findById(req.params.id);

    project.employeeList.unshift(employee);

    await project
      .save()
      .then(async (assignedProject) => {
        const employee = await Employee.findById(req.body.employee._id);
        employee.projectsList.unshift(assignedProject);
        await employee.save();
        res.json(assignedProject);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//Add Sprint To Project
const addSprintToProject = async (req, res) => {
  const { fromDate, toDate } = req.body;
  try {
    const newSprint = new Sprint({
      fromDate,
      toDate,
      isClosed: false,
    });

    //save user to the database
    await newSprint
      .save()
      .then(async (createdSprint) => {
        const project = await Project.findById(req.params.id);
        project.sprintList.unshift(createdSprint);
        await project.save();
        res.json(project);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//Delete Project
const deleteProject = async (req, res) => {
  try {
    const projToDelete = await Project.findById(req.params.id);
    const projectManager = await ProjectManager.findById(
      projToDelete.projectManager._id
    );

    //Remove Project from Project Manager's Project List
    //GET remove index
    const removeIndexPM = await projectManager.projectsList
      .map((item) => item._id)
      .indexOf(req.params.id);

    await projectManager.projectsList.splice(removeIndexPM, 1);

    await projectManager.save();

    //Remove all employees assigned to the project
    await projToDelete.employeeList.forEach(async (singleEmployee) => {
      const employee = await Employee.findById(singleEmployee._id);
      //Remove Employee from Employee's Project List
      //GET remove index
      const removeIndexEmp = await employee.projectsList
        .map((item) => item._id)
        .indexOf(req.params.id);

      await employee.projectsList.splice(removeIndexEmp, 1);

      await employee.save();
    });

    //Remove all sprints assigned to the project
    if (projToDelete.sprintList.length > 0) {
      await projToDelete.sprintList.forEach(async (singleSprint) => {
        console.log("sprintList id : " + singleSprint._id);

        const sprintToBeDeleted = await Sprint.findById(singleSprint._id);

        //Remove all feedbacks assigned to the given sprint
        if (
          sprintToBeDeleted.feedbackList &&
          sprintToBeDeleted.feedbackList.length > 0
        ) {
          await sprintToBeDeleted.feedbackList.forEach(
            async (singleFeedBack) => {
              console.log("feedback id : " + singleFeedBack._id);
              await Feedback.findByIdAndDelete(singleFeedBack._id);
            }
          );
        }

        //Remove all todo issues assigned to the given sprint
        if (
          sprintToBeDeleted.toDoList &&
          sprintToBeDeleted.toDoList.length > 0
        ) {
          await sprintToBeDeleted.toDoList.forEach(async (singleIssue) => {
            console.log("toDoList singleIssue id : " + singleIssue._id);
            await Issue.findByIdAndDelete(singleIssue._id);
          });
        }

        //Remove all InProgress issues assigned to the given sprint
        if (
          sprintToBeDeleted.inProgressList &&
          sprintToBeDeleted.inProgressList.length > 0
        ) {
          await sprintToBeDeleted.inProgressList.forEach(
            async (singleIssue) => {
              console.log("inProgressList singleIssue id : " + singleIssue._id);
              await Issue.findByIdAndDelete(singleIssue._id);
            }
          );
        }

        //Remove all doneL ist issues assigned to the given sprint
        if (
          sprintToBeDeleted.doneList &&
          sprintToBeDeleted.doneList.length > 0
        ) {
          await sprintToBeDeleted.doneList.forEach(async (singleIssue) => {
            console.log("doneList singleIssue id : " + singleIssue._id);
            await Issue.findByIdAndDelete(singleIssue._id);
          });
        }

        await Sprint.findByIdAndDelete(singleSprint._id);
      });
    }

    Project.findByIdAndDelete(req.params.id)
      .then(() => {
        res.json("Project Deleted");
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getProjectDetails,
  createProject,
  getAllProjects,
  updateProject,
  addEmployeeToProject,
  addSprintToProject,
  deleteProject,
};
