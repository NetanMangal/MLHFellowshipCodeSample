const express = require("express");
const auth = require("../middleware/auth");
const sourceHeaderCheck = require("../middleware/sourceHeader");
const app = express();

const adminController = require("../controllers/adminController");

app.post("/register", sourceHeaderCheck, (req, res, next) => {
    adminController.register(req, res, next);
});

app.post("/login", sourceHeaderCheck, (req, res, next) => {
    adminController.login(req, res, next);
});

app.get("/pendingApprovalForms", sourceHeaderCheck, (req, res, next) => {
    adminController.pendingApprovalForms(req, res, next);
});

app.put("/approval", sourceHeaderCheck, (req, res, next) => {
    adminController.approval(req, res, next);
});

app.get("/dashboard", sourceHeaderCheck, (req, res, next) => {
    adminController.dashboardDetails(req, res, next);
});

module.exports = app;