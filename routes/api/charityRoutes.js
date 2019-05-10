const router = require("express").Router();
const charityController = require("../controllers/charityController");

// Matches with "/api/orghunter"
router
  .route("/")
  .get(charityController.find);

module.exports = router;