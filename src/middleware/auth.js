const jwt = require('jsonwebtoken');
const sessionModel = require('../models/userSchema').sessionModel;
const config = require("config");
const msg = require("../../config/messages.json");

const auth = async (req, res, next) => {
    console.log(" In middleware")
    try {
        if (!req.header("x-auth-token")) 
            return res.status(401).send({ error: msg.user.authToken.tokenNotSent });
            
        const token = req.header("x-auth-token");
        const decoded = jwt.verify(token, config.get("sessionConfKey"));
        console.log(decoded)
        const session = await sessionModel.findOne({ _id: decoded._id, "token": token, "logedoutAt": { $exists: false }, source: req.header("x-source") });

        if (!session) return res.status(401).send({ error: msg.user.authToken.invalidToken })

        req.userId = session.userId

        next();
    } catch (e) {
        res.status(401).send(e)
    }
}

module.exports = auth