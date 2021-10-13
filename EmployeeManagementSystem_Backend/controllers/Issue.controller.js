const Issue = require("../models/Issue.model");

//get Issue details
const getAllIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    res.json(issue);
  } catch(err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//get all Issue details
const getAllIssuesList = async (req, res) => {
  try {
    const issuesList = await Issue.find();
    res.json(issuesList);
  } catch(err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//Delete Issues
const deleteIssue = async (req, res) => {
    try {
      Issue.findByIdAndDelete(req.params.id)
        .then(() => {
          res.json("Issue Deleted");
        })
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (err) {
      res.status(500).send("Server Error");
    }
};
  
//Edit issue
const editIssue = async (req, res) => {
    try {
      const issue = await Issue.findById(req.params.id);
  
      if (issue != null) {
        await Issue.findByIdAndUpdate(req.params.id).then((updatedIssue) => {
            updatedIssue.issueName = req.body.issueName;
            updatedIssue.description = req.body.description;
            updatedIssue.points = req.body.points;
            updatedIssue.estimatedTime = req.body.estimatedTime;
  
            updatedIssue
            .save()
            .then((response) => res.status(200).json(response))
        });
      }
    } catch (err) {
      //Something wrong with the server
      return res.status(500).send("Server Error");
    }
  };
module.exports = { deleteIssue, editIssue, getAllIssuesList, getAllIssueById };
