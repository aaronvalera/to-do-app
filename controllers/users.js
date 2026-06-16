const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const nodemailer = require("nodemailer");
const {PAGE_URL} = require("../config.js");

usersRouter.post("/", async (req, res) => {
    try {
        const {username, email, password} = req.body;
        console.log(username, email, password);

        if(!username || !email || !password) {
            return res.status(400).json({error: "All fields are required."});
        }
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({error: "Email is already registered."});
        }
        try {
            const hunterUrl = `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${process.env.HUNTER_API_KEY}`;
            const hunterResponse = await axios.get(hunterUrl);
            const result = hunterResponse.data.data.result;
            if(result === "undeliverable") {
                return res.status(400).json({error: "This email address does not exist or cannot be verified."});
            };
        } catch (hunterError) {
            console.error("Hunter API Error:", hunterError.message);
        }
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
            username,
            email,
            passwordHash,
        });
        const savedUser = await newUser.save();
        const token = jwt.sign({id: savedUser.id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1d"});
        // SEND EMAIL
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });
        await transporter.sendMail({
            from: `"TodoApp" ${process.env.EMAIL_USER}`, // sender address
            to: savedUser.email, // list of recipients
            subject: "TodoApp Verification", // subject line
            html: `
                <h2>Welcome to ToDoApp!</h2>
                <p>Please click the link below to verify your email address:</p>
                <a href='${PAGE_URL}/${token}'>Verificate email</a>
            `, // HTML body
        });
        return res.status(201).json("User registered. Please verify your email.");
    } catch (error) {
        console.error("Backend Error Global:", error); 
        // Si el error es por duplicado en la base de datos (código 11000 de MongoDB)
        if (error.code === 11000) {
            return res.status(400).json({error: "Username or email already exists."});
        }
        // Cualquier otro error del servidor se envía limpiamente como JSON
        return res.status(500).json({error: "An unexpected error occurred on the server."});
    }
});

module.exports = usersRouter;