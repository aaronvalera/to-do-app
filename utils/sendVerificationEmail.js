    const jwt = require("jsonwebtoken");
    const sendGrid = require("@sendgrid/mail");
    sendGrid.setApiKey(process.env.EMAIL_PASS);
    const { PAGE_URL } = require("../config.js");

    const sendVerificationEmail = async (id, email) => {
        // Sign token using JSONWebToken
        const token = jwt.sign(
            { id: id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1d" }
        );
        // Send Email
        const emailVerification = {
            from: '"TodoApp" <aaronrvalera@gmail.com>', // sender address
            to: email, // list of recipients
            subject: "TodoApp Verification", // subject line
            html: `
                <h2>Welcome to ToDoApp!</h2>
                <p>Please click the link below to verify your email address:</p>
                <a href='${PAGE_URL}/verify/${id}/${token}'>Verify email</a>
            `, // HTML body
        };
        try {
            await sendGrid.send(emailVerification);
        } catch (error) {
            console.log("Critical Error sending email verification:", error);
            if (error.response) {
                console.log("Specific error in SendGrid:", JSON.stringify(error.response.body, null, 2));
            }
            throw error;
        }
    };

    module.exports = sendVerificationEmail;