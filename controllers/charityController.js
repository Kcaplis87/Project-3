const axios = require("axios");
const db = require("../../models/charity");

// Defining methods for the charityController

// find searches the orghunter API and returns only the entries that haven't already been saved

// It also makes sure that the charities returned from the API all contain a charity name, url, donationurl, city, state, score, category and mission statement
module.exports = {
  find: function(req, res) {
    const baseURL = "http://data.orghunter.com/v1/charitysearch?";
    const user_key = "user_key=6df46cdb01f8d1e0479ada556c86e59c";
    const { query: params } = req;
    axios
      .post(baseURL + user_key + "&searchTerm=", {
        params
      })
      .then(results =>
        results.data.filter(
          result =>
            result.charityName &&
            result.url &&
            result.donationUrl &&
            result.city &&
            result.state &&
            result.score &&
            result.category &&
            result.missionStatement
        )
      )
      .then(apiCharities =>
        db.Charity.find().then(dbCharities =>
          apiCharities.filter(apiCharity =>
            dbCharities.every(dbCharity => dbCharity.toString() !== apiCharity.id)
          )
        )
      )
      .then(charities => res.json(charities))
      .catch(err => res.status(422).json(err));
  }
};