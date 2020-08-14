const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    "host": "smtp.gmail.com",
    "port": 465,
    "service": "gmail",
    "auth": {
        "user": "a",
        "pass": "A"
    }
});

function mailOptions(toEmail, msg) {
    return {
        "from": "a",
        "to": toEmail,
        "subject": "Reset Password Request",
        "text": msg
    }
}

exports = async function sendMail(toEmail, msg) {
    transporter.verify((error, success) => {
        //check if you are connected to email service
        if (success) {
            console.log("Connected to gmail");
            //try sending email to user
            try {
                var response = await transporter.sendMail(mailOptions);
                return response;
            }
            catch (err) {
                //connected to email service but error sending mail
                console.log("Unable to send email");
                return response;
            }
        }
        //error connecting to email service
        else {
            return "Error connecting gmail\n" + error;
        }
    });
}