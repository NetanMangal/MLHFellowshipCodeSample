const msg = require("../../config/messages.json");

const sourceHeaderCheck = async (req, res, next) => {
    if (req.header("x-source") && (req.header("x-source") === "web" || req.header("x-source") === "mobile"))
        return next();

    if (!req.header('x-source')) 
        return res.status(400).send({ success: false, msg: msg.sourceHeader.sourceHeaderNotSent });

    if (req.header('x-source') != 'mobile' && req.header('x-source') != 'web')
        return res.status(400).send({ success: false, msg: msg.sourceHeader.invalidSourceHeader });

    throw new Error("Some case is unhandled for the request \n");
}

module.exports = sourceHeaderCheck;