const path = require("path");
const router = require("express").Router();
const savedCharityRoutes = require("./savedCharityRoutes");
const charityRoutes = require("./charityRoutes");

// Charity routes
router.use("/savedcharities", savedCharityRoutes);

// Orghunter Routes
router.use("/charity", charityRoutes);

// For anything else, render the html page
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;