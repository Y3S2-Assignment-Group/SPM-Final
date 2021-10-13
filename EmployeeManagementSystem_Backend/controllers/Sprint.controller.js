const Project = require("../models/Project.model");
const Sprint = require("../models/Sprint.model");
const Issue = require("../models/Issue.model");
const Feedback = require("../models/Feedback.model");

//Add issue To Sprint
const addIssueToSprint = async (req, res) => {
  const { issueName, description, points, assignee, estimatedTime } = req.body;
  try {
    const newIssue = new Issue({
      issueName,
      description,
      points,
      assignee,
      progress: "todo",
      estimatedTime,
    });

    //save Issue to the database
    await newIssue
      .save()
      .then(async (createdIssue) => {
        const sprint = await Sprint.findById(req.params.id);
        sprint.toDoList.unshift(createdIssue);
        await sprint.save();
        res.json(sprint);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//Change issue status from Todo to InProgress
const changeIssueStatusTodoToInProgress = async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.id);

    //Move Issue from Todo to InProgress Status
    sprint.inProgressList.unshift(req.body.issue);
    sprint.save().then(async() => {
      //Remove Issue from Todo
      //GET remove index
      const removeIndex = await sprint.toDoList
        .map((item) => item._id)
        .indexOf(req.body.issue);

        await sprint.toDoList.splice(removeIndex, 1);

      sprint.save();

      res.json(sprint);
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//Change issue status from InProgress to Done
const changeIssueStatusInProgressToDone = async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.id);

    //Move Issue from InProgress to doneList Status
    sprint.doneList.unshift(req.body.issue);
    sprint.save().then(async() => {
      //Remove Issue from Todo
      //GET remove index
      const removeIndex = await sprint.inProgressList
        .map((item) => item._id)
        .indexOf(req.body.issue);

        await sprint.inProgressList.splice(removeIndex, 1);

      sprint.save();

      res.json(sprint);
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//Add feedback To Sprint
const addFeedbackSprint = async (req, res) => {
  const { feedback } = req.body;

  try {
    const newfeedback = new Feedback({ feedback });
    //save feedback to the sprintt
    await newfeedback
      .save()
      .then(async (createdfeedback) => {
        const sprint = await Sprint.findById(req.params.id);
        sprint.feedbackList.unshift(createdfeedback);
        await sprint.save();
        res.json(sprint);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//Close the Sprint by Id
const closeSprintById = async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.id);

    if (sprint != null) {
      Sprint.findByIdAndUpdate(req.params.id).then(
        async (projectExistingSprint) => {
          projectExistingSprint.isClosed = true;

          projectExistingSprint
            .save()
            .then(() => res.json("Sprint Closed!"))
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

module.exports = {
  addIssueToSprint,
  addFeedbackSprint,
  changeIssueStatusTodoToInProgress,
  changeIssueStatusInProgressToDone,
  closeSprintById,
};
