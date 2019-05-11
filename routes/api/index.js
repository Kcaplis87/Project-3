const path = require("path");
const router = require("express").Router();
const savedCharityRoutes = require("./savedCharities");
const charityRoutes = require("./charity");

// Charity routes
router.use("/savedCharities", savedCharityRoutes);

// Orghunter Routes
router.use("/charity", charityRoutes);

// For anything else, render the html page
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;