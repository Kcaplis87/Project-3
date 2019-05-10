const db = require("../../models/charity");

// Defining methods for the charityResolver
module.exports = {
  find: function(req, res) {
    db.Charity.find(req.query)
      .then(dbCharity => res.json(dbCharity))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Charity.findById(req.params.id)
      .then(dbCharity => res.json(dbCharity))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Charity.create(req.body)
      .then(dbCharity => res.json(dbCharity))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Charity.findOneAndUpdate({ id: req.params.id }, req.body)
      .then(dbCharity => res.json(dbCharity))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Charity.findById(req.params.id)
      .then(dbCharity => dbCharity.remove())
      .then(dbCharity => res.json(dbCharity))
      .catch(err => res.status(422).json(err));
  }
};