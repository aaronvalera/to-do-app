require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const usersRouter = require("./controllers/users");
const app = express();

(async() => {
    try {
      await mongoose.connect(process.env.MONGO_URI_TEST);
      console.log("Connected to MongoDB.");
    } catch (error) {
        console.log(error);
    }
})();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// FRONTEND ROUTES
app.use("/", express.static(path.resolve("views", "home")));
app.use('/src', express.static(path.resolve(__dirname, 'src')));
app.use("/components", express.static(path.resolve("views", "components")));
app.use("/images", express.static(path.resolve("media")));
app.use("/login", express.static(path.resolve("views", "login")));
app.use("/signup", express.static(path.resolve("views", "signup")));
app.use("/verify/:id/:token", express.static(path.resolve("views", "verify")));

app.use(morgan("tiny"));

// BACKEND ROUTES
app.use("/api/users", usersRouter);

module.exports = app;