const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const app = express();
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cargonex"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err);
    } else {
        console.log("Connected to CargoNex MySQL Database!");
    }
});

app.use(cors());
app.use(bodyParser.json());

// Temporary User Storage
let users = [];

// Temporary Cargo Storage
let cargoRequests = [];

// Home Route
app.get("/", (req, res) => {
    res.send("CargoNex Backend is Running 🚢");
});

// REGISTER USER
app.post("/register", (req, res) => {

    const user = req.body;

    console.log(user);

    users.push(user);

    res.json({
        message: "User Registered Successfully",
        users
    });

});

// LOGIN USER
app.post("/login", (req, res) => {

    const { email, password } = req.body;

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (user) {

        res.json({
            message: "Login Successful",
            user
        });

    } else {

        res.status(401).json({
            message: "Invalid Email or Password"
        });

    }

});

// POST CARGO
app.post("/cargo", (req, res) => {

    const cargo = req.body;

    cargoRequests.push(cargo);

    console.log(cargoRequests);

    res.json({
        message: "Cargo Request Posted Successfully",
        cargoRequests
    });

});

// GET ALL CARGO
app.get("/cargo", (req, res) => {

    res.json(cargoRequests);

});

// START SERVER
app.listen(3000, () => {
    console.log("CargoNex server running on port 3000");
});