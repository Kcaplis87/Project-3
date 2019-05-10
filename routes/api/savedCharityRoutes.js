const router = require("express").Router();
const charityResolver = require("../../graphql/resolvers/charityResolver.js");

// Matches with "/api/charities"
router.route("/")
  .get(charityResolver.find)
  .post(charityResolver.create);

// Matches with "/api/charities/:id"
router
  .route("/:id")
  .get(charityResolver.findById)
  .put(charityResolver.update)
  .delete(charityResolver.remove);

module.exports = router;