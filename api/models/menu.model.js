const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        price: Number,
        image: String,
        duration: Number,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Menu", menuSchema);
