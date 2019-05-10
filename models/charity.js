// Charity Model
const mongoose = require('mongoose');

// Charities Collection
const Schema = mongoose.Schema;

const charitySchema = new Schema({
    url: { type: String, required: true },
    donationUrl: { type: String, required: true },
    state: { type: String },
    score: { type: Number, required: true },
    category: { type: String },
    website: { type: String },
    missionStatement: { type: String }
});

const Charity = mongoose.model('Charity', charitySchema);

module.exports = Charity;