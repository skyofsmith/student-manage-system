const express = require("express");
const mysql = require("../utils/mysql");
// const { md5, sha256 } = require("../utils/hash");

const router = express.Router();

router.post("/findUser", (req, res) => {
  console.log("/findUser", req.body);
  let { username } = req.body;
  if (!username) {
    res.json({
      status: "failed",
      message: "username can not be empty"
    });
    return;
  }
  mysql.query(
    "select * from user where username = ?",
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({
          status: "failed",
          message: "username or password not correct"
        });
        return;
      }
      if (!result || !result.length) {
        res.json({
          status: "failed",
          message: "username or password not correct"
        });
      }
      res.json({
        status: "success",
        data: result.map
      });
    }
  );
});
module.exports = router;
