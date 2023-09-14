const User = require('../models/UserSchema');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUpController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!email || !name || !password) {
            return res.send("name, email and password are required");
        }

        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.send("Already registered");
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashPassword
        });

        return res.send("User created succesfully");
    } catch (error) {
        return res.send(error);
    }
}

module.exports = { signUpController }