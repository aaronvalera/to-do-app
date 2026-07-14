const usersRouter = require("express").Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const sendVerificationEmail = require("../utils/sendVerificationEmail.js");

usersRouter.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered." });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ 
      username,
      email,
      passwordHash
    });
    const savedUser = await newUser.save();
    try {
      await sendVerificationEmail(savedUser.id, savedUser.email);
      return res.status(201).json({ message: "Please check your email's Spam to verify your account." });
    } catch (emailError) {
      try {
        const hunterUrl = `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${process.env.HUNTER_API_KEY}`;
        const hunterResponse = await axios.get(hunterUrl);
        const result = hunterResponse.data.data.result;
        if (result === "undeliverable") {
          await User.findByIdAndDelete(savedUser.id);
          return res.status(400).json({ error: "This email address does not exist or cannot be verified." });
        }
        await User.findByIdAndUpdate(savedUser.id, { verified: true });
        return res.status(201).json({ message: "Registration successful! You can now log in directly." });
      } catch (hunterError) {
        console.error("Critical: Both SendGrid and Hunter failed:", hunterError.message);
        await User.findByIdAndUpdate(savedUser.id, { verified: true });
        return res.status(201).json({ message: "Registration successful! You can now log in directly." });
      }
    }
  } catch (error) {
    console.error("Backend Error Global:", error);
    if (error.code === 11000) { // Si el error es por duplicado en la base de datos (código 11000 de MongoDB)
      return res.status(400).json({ error: "Username or email already exists." });
    }
    return res.status(500).json({ error: "An unexpected error occurred on the server." });
  }
});

usersRouter.patch("/:id/:token", async (req, res) => {
    try {
        const token = req.params.token;
        const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const id = verifiedToken.id;
        const user = await User.findByIdAndUpdate(id, { verified: true });
        if (user.verified) {
          return res.status(400).json({ error: "This account has already been verified." });
        }
        return res.sendStatus(200);
    } catch (error) {
        const userId = req.params.id;
        try {
          const user = await User.findById(userId);
          if (!user) {
            return res.status(404).json({ error: "The user associated with this link no longer exists." });
          }
          await sendVerificationEmail(userId, user.email);
          return res.status(400).json({ error: "The link has expired. A new verification link has been sent." });

        } catch (innerError) {
          console.error("Critical error inside Catch:", innerError.message);
          return res.status(500).json({ error: "An unexpected error occurred while processing the expired link." });
        }
    }
});

module.exports = usersRouter;