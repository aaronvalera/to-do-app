const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const {PAGE_URL} = require("../config.js");

const sendVerificationEmail = async (id, email) => {
    // Sign token using JSONWebToken
    const token = jwt.sign(
        { id: id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
    );
    // Send Email
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    await transporter.sendMail({
        from: `"TodoApp" <${process.env.EMAIL_USER}>`, // sender address
        to: email, // list of recipients
        subject: "TodoApp Verification", // subject line
        html: `
            <h2>Welcome to ToDoApp!</h2>
            <p>Please click the link below to verify your email address:</p>
            <a href='${PAGE_URL}/verify/${id}/${token}'>Verify email</a>
        `, // HTML body
    });
};

module.exports = sendVerificationEmail;