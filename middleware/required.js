const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');

module.exports = async (req, res, next) => {
    if (!req.headers || !req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
        return res.send("Token is required");
    }

    const accessToken = req.headers.authorization.split(" ")[1];
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_PRIVATE_KEY);
        req._id = decoded._id;

        const user = await User.findById(req._id);
        if (!user) {
            res.send("User not found");
        }

        next();
    } catch (error) {
        return res.send("Invalid Key");
    }
}