const express = require("express");
const router = express.Router();

const {
    deleteIssue,editIssue,getAllIssuesList,getAllIssueById
} = require("../controllers/Issue.controller");

router.get("/:id", getAllIssueById);
router.get("/all",getAllIssuesList);
router.delete("/:id", deleteIssue);
router.put("/:id", editIssue);

module.exports = router;
