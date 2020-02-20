
// Define a plan for a collection

const mongoose = require('mongoose');

// Schema for a collection of professors
const Voter = new mongoose.Schema({
    first: String,
    last: String,
    zip: Number,
    history: [String]
    });

// Speed up queries on all fields
Voter.index({name: 1});
Voter.index({rank: 1});
Voter.index({started: 1});
Voter.index({courses: 1});

// Compile and export this schema
module.exports = mongoose.model('Voter', Voter);
