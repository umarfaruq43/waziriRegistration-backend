const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    name: String,
    dateOfBirth: String,
    phoneNumber: String,
    position: String,
    jerseyNumber: String,
});

const registrationSchema = new mongoose.Schema({
    teamName: String,
    teamImage: String,
    teamManager: String,
    contactAddress: String,
    phoneNumber: String,
    email: String,
    localGovernment: String,
    players: [playerSchema],
    registrationId: String,
    registrationDate: String,
});

const Registration = mongoose.model("Registration", registrationSchema);

module.exports = Registration;
