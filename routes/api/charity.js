const router = require("express").Router();
const charityController = require("../controllers/charityController");

// Matches with "/api/charity"
router
  .route("/")
  .get(charityController.findAll);

module.exports = router;