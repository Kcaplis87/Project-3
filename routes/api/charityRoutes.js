const router = require("express").Router();
const charityResolver = require("../../graphql/resolvers/charityResolver");

// Matches with "/api/orghunter"
router
  .route("/")
  .get(charityResolver.find);

module.exports = router;