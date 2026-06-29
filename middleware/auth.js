const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const userExtractor = async (req, res, next) => {
    try {
        const accessToken = req.cookies?.accessToken;
        if(!accessToken) {
            return res.sendStatus(401);
        }
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken.id);
        req.user = user;
        next();
    } catch (error) {
        return res.sendStatus(401);
    }
};

module.exports = { userExtractor };