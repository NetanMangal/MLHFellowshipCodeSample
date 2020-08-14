const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const { string } = require("@hapi/joi");

const AdminSchema = new mongoose.Schema({
    
    "email": {
        type: String,
        required: true,
        minlength: 5,
        lowercase: true
    },
    "password": {
        type: String,
        required: true,
        //dont set max length of password as saved password is in hashed form
    },
    // "token": {
    //     type: String,
    // },
    forgotPassContent: {
        token: String,
        issuedAt: Date
    }
}, { "timestamps": true });



AdminSchema.methods.genForgotPasswordToken = function () {
    let token = String((Date.now() % (Date.now() % 8754968553) + Date.now() % 584184500) % 1000000).padEnd(6, Date.now() % 4);
    return token;
}
AdminSchema.methods.genActToken = function () {
    const token = jwt.sign({ "password": this.password, "email": this.email }, config.get("jwtKey"), { expiresIn: config.get("jwtActTokenExpirationTime") });
    return token;
}

// UserSchema.methods.genNewPassword = function () {
//     const numbers = [8, 9, 10, 11, 7, 10, 9, 7, 8, 7, 11, 7, 10];
//     let password = Math.random().toString(36).slice(-1 * (Date.now() % 3) + 8);
//     const symbols = ['"', '-', '!', '/', '|', '+', '<', '&', '%', '=', '*'];
//     for (var i = 0; i < 3; i++)
//         password.concat(symbols[Date.now() % 11]);
//     password.concat(Math.random().toString(36).slice(4));
//     return password;
// }

const AdminModel = mongoose.model("adminDetails", AdminSchema, "adminDetails");

//--------------

const sessionSchemaAdmin = new mongoose.Schema({
    //we cannot set _id property in this database as user may login
    //through multiple browsers and can have multiple sessions
    "adminId": {
        type: mongoose.Types.ObjectId,
        ref: "adminSchema",
        required: true
    },
    "loginedAt": {
        type: Date,
        default: Date.now
    },
    "logedoutAt": {
        type: Date
    },
    "token": {
        type: String,
    },
    "source": {
        type: String,
        required: true,
        enum: ["web", "mobile"]
    }
});


sessionSchemaAdmin.methods.genSesToken = function () {
    const token = jwt.sign({ _id: this._id }, config.get("sessionConfKey"), { expiresIn: config.get("jwtSesTokenExpirationTime") });
    return token;
}

const sessionModelAdmin = mongoose.model("curSessionsAdmin", sessionSchemaAdmin, "curSessionsAdmin");

module.exports.AdminModel = AdminModel;
// module.exports.activatedUserModel = activatedUserModel;
module.exports.sessionModelAdmin = sessionModelAdmin;