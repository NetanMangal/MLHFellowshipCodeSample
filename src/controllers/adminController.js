const _ = require("lodash");
const bcrypt = require("bcryptjs");

const adminModel = require("../models/adminSchema").AdminModel;
const sessionModel = require("../models/adminSchema").sessionModelAdmin;
const msg = require("../../config/messages.json");
const PledgeForm = require("../models/formSchema");
const { isEmpty } = require("lodash");

//Temperory route only for testings
async function register(req, res, next) {
    console.log("In Admin register");
    try {

        let user = _.pick(req.body, ["email", "password"]);
        let email = req.body.email;
        let password = req.body.password;

        const alreadySuperUser = await adminModel.findOne({});
        if (alreadySuperUser) return res.status(400).send({ success: false, msg: msg.admin.register.alreadySuperUserExist });
        let Admin = new adminModel(user);
        console.log(Admin);

        Admin.password = await bcrypt.hash(Admin.password, 10);    //this can also be done in userSchema.js using PRE middleware on the UserSchema schema.

        await Admin.save();

        //--------------------------------//
        //send email with activation token//
        //--------------------------------//

        //res.status(200).send({ success: true, msg: msg.user.register.success });
        res.status(200).send({ success: true, msg: _.pick(Admin, ["email"]) });
    }
    catch (e) {
        console.log("Point 1 error " + e);
        res.status(500).send({ success: false, msg: e });
    }
}

async function login(req, res, next) {
    console.log("In Admin login");
    try {
        // let admin = _.pick(req.body, ["email", "password"]);
        let recEmail = req.body.email;
        let recPassword = req.body.password;

        if (!adminExist) return res.status(400).send({ success: false, msg: msg.user.login.invalidEmail });

        let isPasswordCorrect = await bcrypt.compare(recPassword, adminExist.password);
        if (!isPasswordCorrect) return res.status(400).send({ success: false, msg: msg.user.login.invalidPassword });

        let session = new sessionModel({});
        session.adminId = adminExist._id;
        session.token = session.genSesToken();
        session.source = req.header('x-source');
        await session.save();

        res.header("x-auth-token", session.token).status(200).send({ success: true, msg: session.token });
    }
    catch (e) {
        console.log("Point 3 error");
        res.status(500).send({ success: false, msg: e });
        console.log(e);
    }
}

async function pendingApprovalForms(req, res, next) {
    console.log('In pledge approval pending');
    try {
        const form = await PledgeForm.find().select({ "isApproved": false });
        //console.log(user);
        res.status(200).send({ success: true, msg: form });
    }
    catch (e) {
        console.log("Point 1 error " + e);
        res.status(500).send({ success: false, msg: e });
    }
}

async function approval(req, res, next) {
    console.log('In pledge approval-disaproval');
    try {
        console.log(req.body.formId);

        //add checks here

        if (req.body.approve) {
            console.log("here")
            const form = await PledgeForm.findOneAndUpdate({ _id: req.body.formId }, { isApproved: true });
            res.status(200).send({ success: true, msg: "approved" });
        }
        else {
            const form = await PledgeForm.findByIdAndDelete(req.body.formId);
            // form.save();

            /**
             * an email will be sent to user if form is rejected
             */

            res.status(200).send({ success: true, msg: "disapproved" });
        }
    }
    catch (e) {
        console.log("Point 1 error " + e);
        res.status(500).send({ success: false, msg: e });
    }
}

async function dashboardDetails(req, res, next) {
    console.log("In admin dashboard");

    if (!req.body.from || !req.body.to)
        return res.status(400).send({ success: false, msg: "From and To not sent" });

    const startDate = new Date(req.body.from);
    const toDate = new Date(req.body.to);

    /**
     * adding validations here
     */

    try {
        // const result = await PledgeForm.findOne({isApproved: true});
        let result = await PledgeForm.aggregate([
            { $match: { isApproved: true, createdAt: { $gte: startDate }, createdAt: { $lte: toDate } } },
            {
                $facet:
                {
                    "heart": [
                        { $match: { "organDonation.heart": true } },
                        { $count: "count" }
                    ],
                    "allOrgans": [
                        { $match: { "organDonation.allOrgans": true } },
                        { $count: "count" }
                    ],
                    "liver": [
                        { $match: { "organDonation.liver": true } },
                        { $count: "count" }
                    ],
                    "kidney": [
                        { $match: { "organDonation.kidney": true } },
                        { $count: "count" }
                    ],
                    "intestine": [
                        { $match: { "organDonation.intestine": true } },
                        { $count: "count" }
                    ],
                    "pancreas": [
                        { $match: { "organDonation.pancreas": true } },
                        { $count: "count" }
                    ],
                    "lung": [
                        { $match: { "organDonation.lung": true } },
                        { $count: "count" }
                    ],
                    "allTissues": [
                        { $match: { "organDonation.allTissues": true } },
                        { $count: "count" }
                    ],
                    "bones": [
                        { $match: { "organDonation.bones": true } },
                        { $count: "count" }
                    ],
                    "heartValve": [
                        { $match: { "organDonation.heartValve": true } },
                        { $count: "count" }
                    ],
                    "skin": [
                        { $match: { "organDonation.skin": true } },
                        { $count: "count" }
                    ],
                    "cornea": [
                        { $match: { "organDonation.cornea": true } },
                        { $count: "count" }
                    ],
                    "cartilage": [
                        { $match: { "organDonation.cartilage": true } },
                        { $count: "count" }
                    ]
                }
            },
        ]);

        //Arranging the records in proper order
        result = result[0];
        result.allOrgans = result.allOrgans[0] ? result.allOrgans[0].count : 0;
        result.liver = result.liver[0] ? result.liver[0].count : 0;
        result.kidney = result.kidney[0] ? result.kidney[0].count : 0;
        result.heart = result.heart[0] ? result.heart[0].count : 0;
        result.intestine = result.intestine[0] ? result.intestine[0].count : 0;
        result.pancreas = result.pancreas[0] ? result.pancreas[0].count : 0;
        result.lung = result.lung[0] ? result.lung[0].count : 0;
        result.allTissues = result.allTissues[0] ? result.allTissues[0].count : 0;
        result.bones = result.bones[0] ? result.bones[0].count : 0;
        result.heartValve = result.heartValve[0] ? result.heartValve[0].count : 0;
        result.skin = result.skin[0] ? result.skin[0].count : 0;
        result.cornea = result.cornea[0] ? result.cornea[0].count : 0;
        result.cartilage = result.cartilage[0] ? result.cartilage[0].count : 0;

        res.send({ success: true, msg: result });
    } catch (e) {
        console.log("Point x error " + e);
        res.status(500).send({ success: false, msg: e });
    }
}

module.exports.register = register;
module.exports.login = login;
module.exports.pendingApprovalForms = pendingApprovalForms;
module.exports.approval = approval;
module.exports.dashboardDetails = dashboardDetails;