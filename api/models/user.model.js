const mongoose = require("mongoose");

let userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "INACTIVE",
        },
        phone: String,
        email: String,
        role: {
            type: String,
            default: "USER",
        },
    },
    { timestamps: true }
);

userSchema.methods.hiddenFields = function () {
    delete this.password;
    return this;
};

module.exports = mongoose.model("User", userSchema);
