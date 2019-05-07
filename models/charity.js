// Charity Model
const mongoose = require('mongoose');

// Charities Collection
const Schema = mongoose.Schema;

const charitySchema = new Schema({
    url: {
        type: String
    },
    donationUrl: {
        type: String
    },
    state: {
        type: String
    },
    score: {
        type: Number
    },
    category: {
        type: String
    },
    website: {
        type: String
    },
    missionStatement: {
        type: String
    }
});

module.exports = mongoose.model('Charity', charitySchema);