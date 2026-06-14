require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

(async() => {
    try {
      await mongoose.connect(process.env.MONGO_URI_TEST);
      console.log("Connected to MongoDB.");
    } catch (error) {
        console.log(error);
    }
})();

// FRONTEND ROUTES
app.use("/", express.static(path.resolve("views", "home")));
app.use('/src', express.static(path.resolve(__dirname, 'src')));
app.use("/components", express.static(path.resolve("views", "components")));
app.use("/images", express.static(path.resolve("media")));
app.use("/login", express.static(path.resolve("views", "login")));
app.use("/signup", express.static(path.resolve("views", "signup")));

app.listen(process.env.MONGO_URI_TEST, () => {
    console.log("Server is listening the port 3000.");
}
);

module.exports = app;