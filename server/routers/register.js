const express = require("express");

const router = express.Router();

router.post("/register", (req, res) => {
  console.log("post: /register");
  res.json({
    status: "success"
  });
});

module.exports = router;
