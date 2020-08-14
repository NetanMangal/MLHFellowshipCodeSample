const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const Joi = require("@hapi/joi");
const morgan = require("morgan");
const cors = require("cors");

const dbConnection = require("./src/dbConnection.js");
const userRoutes = require("./src/routes/userRoutes.js");
const msg = require("./config/messages.json");
const app = express();
const adminRoutes = require("./src/routes/adminRoutes.js")

//MIDDLEWARES
app.use(express.json());        //for parsing application/json
app.use(express.urlencoded({    //for parsing application/x-www-form-urlencoded
    "extended": true
}));
app.use(morgan("tiny"));

app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "*");
    res.set("X-Developed-By", "ORGAN-DONATION-THEME-BACKEND-TEAM");

    next();
});

//ROUTING
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

//REQUEST
app.get("/", (req, res) => {
    res.send("We are on homepage ");
});

module.exports = app;
