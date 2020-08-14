const express = require("express");
const auth = require("../middleware/auth");
const sourceHeaderCheck = require("../middleware/sourceHeader");
const app = express();

const userController = require("../controllers/userController");

app.post("/register", sourceHeaderCheck, (req, res, next) => {
    userController.register(req, res, next);
});

app.get("/activate/:token", (req, res, next) => {
    console.log(req.params.token);
    userController.activate(req, res, next, req.params.token);
});

app.post("/login", sourceHeaderCheck, (req, res, next) => {
    userController.login(req, res, next);
});

app.put("/resendActivation", sourceHeaderCheck, (req, res, next) => {
    userController.resendActivation(req, res, next);
});

app.get("/forgotPassword", sourceHeaderCheck, (req, res, next) => {
    userController.forgotPassword(req, res, next);
});

//restricting this route to check if localStorage has "userId" and "iss"
app.put("/resetPassword", sourceHeaderCheck, (req, res, next) => {
    userController.resetPassword(req, res, next);
});

app.post("/form", sourceHeaderCheck, auth, (req, res, next) => {
    userController.pledgeForm(req, res, next);
});

app.get("/profile", sourceHeaderCheck, auth, (req, res, next) => {
    userController.getProfile(req, res, next);
});

app.post("/feedback", sourceHeaderCheck, auth, (req, res, next) => {
    userController.feedback(req, res, next);
});

module.exports = app;