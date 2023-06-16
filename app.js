const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3300;

app.use(express.urlencoded({
    extended: false
}));

app.use(express.json({
    limit: "50mb"
}));

//Database connection
require('./config/db');

app.use(cors("*"));

const user = require("./routes/user-router");
app.use("/user", user);

const email = require("./routes/email-router");
app.use("/api", email);

app.get("/", (req, res) => {
    res.send("Dixantrix");
});

app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).json({
        error: true,
        message: "Internal Server Error",
        details: err,
    });
});

app.listen(port, () => {
    console.log(`App running on ${port}`);
});