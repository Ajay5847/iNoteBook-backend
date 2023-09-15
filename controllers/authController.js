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

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.send("email and password are required");
        }

        const oldUser = await User.findOne({ email }).select('+password');
        if (!oldUser) {
            return res.send("User is not registered");
        }
        const matched = await bcrypt.compare(password, oldUser.password);
        if (!matched) {
            return res.send("Incorrect Password");
        }

        const accessToken = generateAccessToken({ _id: oldUser._id });
        const refreshToken = generateRefreshToken({ _id: oldUser._id });
        res.send(accessToken);
    } catch (error) {
        res.send(error);
    }
}

const generateAccessToken = (data) => {
    try {
        const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
            expiresIn: '1d'
        });
        return token;
    } catch (error) {
        console.log(error);
    }
}

const generateRefreshToken = (data) => {
    try {
        const token = jwt.sign(data, "AJAYJAYAJAYA", {
            expiresIn: '1y'
        });
        return token;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { signUpController, loginController }