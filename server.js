const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Temporary storage (in-memory)
const Registration = require("./models/Registration.ts");

// "mongodb+srv://abdulazeezfaruq43_db_user:9pHIWFGU2Kthqx7D@waziri.9k7im9c.mongodb.net/?appName=waziri"
mongoose
    .connect(
        "mongodb+srv://abdulazeezfaruq43_db_user:9pHIWFGU2Kthqx7D@waziri.9k7im9c.mongodb.net/waziri?appName=waziri"
    )
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// POST endpoint - to register a new team
// app.post("/api/register", (req, res) => {
//     const data = req.body;

//     // Validate required fields
//     if (!data.teamName || !data.teamManager || !data.players) {
//         return res.status(400).json({ message: "Missing required fields" });
//     }

//     const newRegistration = {
//         id: registrations.length + 1,
//         registrationId:
//             data.registrationId ||
//             `WC2025-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
//         registrationDate: data.registrationDate || new Date().toISOString(),
//         ...data,
//     };

//     registrations.push(newRegistration);
//     res.status(201).json({
//         message: "Registration successful",
//         data: newRegistration,
//     });
// });
app.post("/api/register", async (req, res) => {
    try {
        const data = req.body;

        // Validate required fields
        if (!data.teamName || !data.teamManager || !data.players) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newRegistration = new Registration({
            registrationId: `WC2025-${Math.random()
                .toString(36)
                .substr(2, 6)
                .toUpperCase()}`,
            registrationDate: new Date().toISOString(),
            ...data,
        });

        const saved = await newRegistration.save();
        res.status(201).json({
            message: "Registration successful",
            data: saved,
        });
    } catch (err) {
        console.error("Error saving registration:", err);
        res.status(500).json({ message: "Server error" });
    }
});
// GET endpoint - to fetch all teams
// app.get("/api/teams", (req, res) => {
//     res.json(registrations);
// });

app.get("/api/teams", async (req, res) => {
    try {
        const teams = await Registration.find();
        res.json(teams);
    } catch (err) {
        console.error("Error fetching teams:", err);
        res.status(500).json({ message: "Server error" });
    }
});
// keep alive endpoint

app.get("/ping", (req, res) => {
    res.status(200).send("pong");
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

// mongodb+srv://abdulazeezfaruq43_db_user:9pHIWFGU2Kthqx7D@waziri.9k7im9c.mongodb.net/?appName=waziri
