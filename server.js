const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Temporary storage (in-memory)
let registrations = [];

// POST endpoint - to register a new team
app.post("/api/register", (req, res) => {
    const data = req.body;

    // Validate required fields
    if (!data.teamName || !data.teamManager || !data.players) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const newRegistration = {
        id: registrations.length + 1,
        registrationId:
            data.registrationId ||
            `WC2025-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        registrationDate: data.registrationDate || new Date().toISOString(),
        ...data,
    };

    registrations.push(newRegistration);
    res.status(201).json({
        message: "Registration successful",
        data: newRegistration,
    });
});

// GET endpoint - to fetch all teams
app.get("/api/teams", (req, res) => {
    res.json(registrations);
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
