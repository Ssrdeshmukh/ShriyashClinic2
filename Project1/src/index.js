const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const { collection, collection2 } = require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/index", (req, res) => {
    res.render("index");
});

app.get("/fitness", (req, res) => {
    res.render("fitness");
})

app.get("/about", (req, res) => {
    res.render("about");
})

app.get("/services", (req, res) => {
    res.render("services");
})

app.get("/appointment", (req, res) => {
    res.render("appointment");
})

app.get("/signup", (req, res) => {
    res.render("signup");
})

app.get("/login", (req, res) => {
    res.render("login");
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

// Signup route
app.post("/signup", async (req, res) => {
    const { username, newPassword, confirmPassword } = req.body;
    
    if (newPassword !== confirmPassword) {
        return res.status(400).send("Passwords do not match. Please try again.");
    }

    try {
        const existingUser = await collection.findOne({ name: username });
        if (existingUser) {
            return res.status(400).send("User already exists. Please choose a different username.");
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        const newUser = new collection({
            name: username,
            password: hashedPassword
        });

        await newUser.save();
        return res.status(201).send("User created successfully!");
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).send("Error creating user. Please try again later.");
    }
});

// Login route
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            return res.status(404).send("Account not found.");
        }
        
        const isPasswordMatched = await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatched) {
            return res.render("index");
        } else {
            return res.status(400).send("Wrong Password!");
        }
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).send("Wrong Credentials!!");
    }
});



app.post("/appointment", async (req, res) => {
    const { patientName, contactInfo, date, slot, reason } = req.body;

    try {
        // Check if the appointment already exists for the same patient, date, and slot
        const existingAppointment = await collection2.findOne({name: patientName});

        if (existingAppointment) {
            return res.status(400).send("You have already booked an appointment for this slot.");
        }

        // If appointment does not exist, create a new appointment
        const newAppointment = {
            name: patientName,
            contact: contactInfo,
            date: date,
            slot: slot,
            reason: reason
        };

        const result = await collection2.insertMany(newAppointment);
        console.log("Appointment booked:", result);

        return res.status(201).send("Appointment booked successfully.");
    } catch (error) {
        console.error("Error creating appointment:", error);
        return res.status(500).send("Error creating appointment. Please try again later.");
    }
});