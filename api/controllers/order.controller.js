const { json } = require("express");
const Order = require("../models/order.model");
const User = require("../models/user.model");
// Twilio API
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
// Nodemailer API
const nodemailer = require("nodemailer");

const getOrders = async (req, res) => {
    const orders = await Order.find();
    res.json({ orders });
};

const addOrder = async (req, res, next) => {
    const { name, phone, table, menus, total, status } = req.body;

    try {
        const order = await Order.create({ name, phone, table, menus, total, status });

        if (!order) return res.status(404).json({ error: "Order not found" });

        const user = await User.findOne();

        const msg = `*${name}* ha hecho un pedido en la *mesa ${table}*\n${menus
            .map((menu) => `${menu.name} x ${menu.quantity} - ${menu.price}`)
            .join("\n")}\nTotal: ${total}`;

        // if (user.phone) {
        //     client.messages.create({
        //         from: "whatsapp:" + process.env.TWILIO_PHONE,
        //         body: msg,
        //         to: "whatsapp:+549" + user.phone,
        //     });
        // }

        // if (user.email) {
        //     let transporter = nodemailer.createTransport({
        //         host: "smtp.gmail.com",
        //         port: 465,
        //         secure: true,
        //         auth: {
        //             type: "OAuth2",
        //             user: process.env.GMAIL_USER,
        //             clientId: process.env.GMAIL_CLIENT_ID,
        //             clientSecret: process.env.GMAIL_CLIENT_SECRET,
        //             refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        //             accessToken: process.env.GMAIL_ACCESS_TOKEN,
        //             expires: 1484314697598,
        //         },
        //     });
        //     transporter.sendMail({
        //         from: process.env.GMAIL_USER,
        //         to: user.email,
        //         subject: "Nuevo pedido",
        //         text: msg,
        //     });
        // }

        res.json({ order });
    } catch (err) {
        next(err);
    }
};

const updateOrder = async (req, res) => {
    const { name, table, menus, total, status } = req.body;

    try {
        const order = await Order.findByIdAndUpdate(req.params.id, {
            name,
            table,
            menus,
            total,
            status,
        });

        if (!order) return res.status(404).json({ error: "Order not found" });

        res.json({ order });
    } catch (err) {
        next(err);
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) return res.status(404).json({ error: "Order not found" });

        res.json({ order });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getOrders,
    addOrder,
    updateOrder,
    deleteOrder,
};
