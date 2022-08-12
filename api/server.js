const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Import environment variables
require("dotenv").config();

// Parse json
/* app.use(express.json());
app.use(express.urlencoded({ extended: true })); */
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
// Cors
app.use(cors());
 
// Import routes
app.use("/api", require("./routes/auth.route"));
app.use("/api", require("./routes/user.route"));
app.use("/api", require("./routes/order.route"));
app.use("/api", require("./routes/menu.route"));

// Connect to DB
mongoose.connect(process.env.URLDB, (err) => {
    if (err) throw err;
    console.log("Connected Database");
});

// Run server
app.get("/", (req, res) => {
    res.send("API Running");
});

// Images path
app.use("/uploads", express.static("./uploads"));

// Middleware for error handling
app.use(require("./middlewares/error.middleware"));

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
