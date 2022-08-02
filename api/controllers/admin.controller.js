const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    try {
        res.json({ user: user.hiddenFields() });
    } catch (err) {
        next(err);
    }
};

const updateUser = async (req, res, next) => {
    const { username, password, status, role, phone, email } = req.body;
    let passwordHash;

    if (username <= 0 || password <= 0)
        return res.status(400).json({ error: "Username or password is incorrect" });

    if (await User.findOne({ username }))
        return res.status(400).json({ error: "Username already exists" });

    try {
        if (password) {
            const salt = await bcrypt.genSalt(10);
            passwordHash = await bcrypt.hash(password, salt);
        }

        const user = await User.findByIdAndUpdate(req.params.id, {
            username,
            password: passwordHash,
            status,
            role,
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

const deleteUser = async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    try {
        res.json({
            user: user.hiddenFields(),
        });
    } catch (err) {
        next(err);
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        next(err);
    }
};

const deleteUsers = async (req, res) => {
    const ids = req.body.ids;
    // Example: const ids = ["62be633aa3b0d9514645bf54", "62be633aa3b0d9514645bf53"];
    try {
        const users = !ids
            ? await User.deleteMany({ role: "USER" }) // Delete all users
            : await User.deleteMany({ _id: { $in: ids } }); // Delete users with ids in ids array
        res.json(users);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getUser,
    updateUser,
    deleteUser,
    getUsers,
    deleteUsers,
};