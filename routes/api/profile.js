const express = require("express");
const router = express.Router(); //We don't need all of Express, just Router

//subroute
router.get("/test", (req, res) =>
  res.json({
    msg: "Profile works!"
  })
);

module.exports = router;
