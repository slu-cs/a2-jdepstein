
const mongoose = require('mongoose');

// Schema for a collection of voters
const Voter = new mongoose.Schema({
    first: String,
    last: String,
    zip: String,
    history: String
    });

// Speed up queries on all fields
Voter.index({frist: 1});
Voter.index({last: 1});
Voter.index({zip: 1});
Voter.index({history: 1});

// Compile and export this schema
module.exports = mongoose.model('Voter', Voter);
