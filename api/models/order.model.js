const mongoose = require("mongoose");

let orderSchema = new mongoose.Schema(
    {
        name: String,
        phone: String,
        table: String,
        menus: [
            {
                name: String,
                quantity: Number,
                price: Number,
            },
        ],
        total: Number,
        expiration: {
            type: Date,
            default: Date.now,
        },
        status: { type: String, default: "PENDING" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
