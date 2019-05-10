const router = require("express").Router();
const savedCharityResolver = require("../../graphql/resolvers/savedCharityResolver.js");

// Matches with "/api/charities"
router.route("/")
  .get(savedCharityResolver.find)
  .post(savedCharityResolver.create);

// Matches with "/api/charities/:id"
router
  .route("/:id")
  .get(savedCharityResolver.findById)
  .put(savedCharityResolver.update)
  .delete(savedCharityResolver.remove);

module.exports = router;