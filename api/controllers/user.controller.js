const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAccount = async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    try {
        res.json({ user: user.hiddenFields() });
    } catch (err) {
        next(err);
    }
};

const updateAccount = async (req, res, next) => {
    const { username, password, phone, email } = req.body;
    let passwordHash;

    try {
        if (password) {
            const salt = await bcrypt.genSalt(10);
            passwordHash = await bcrypt.hash(password, salt);
        }

        const user = await User.findByIdAndUpdate(req.user.id, {
            username,
            password: passwordHash,
            phone,
            email,
        });

        if (!user) return res.status(404).json({ error: "User not found" });

        const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_KEY, {
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        });

        res.json({
            user: user.hiddenFields(),
            token,
            refreshToken,
        });
    } catch (err) {
        next(err);
    }
};

const deleteAccount = async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.user.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    try {
        res.json({
            user: user.hiddenFields(),
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAccount,
    updateAccount,
    deleteAccount,
};
