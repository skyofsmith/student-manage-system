const express = require("express");
const mysql = require("../utils/mysql");
const userLog = require("../utils/logUser");
const { md5, sha256 } = require("../utils/hash");

const router = express.Router();

router.post("/modifyInfo", (req, res) => {
  console.log("post: /modifyInfo", req.body);
  // mysql.connect();
  let { username, password, email, address, gender, realName } = req.body;
  if (!username || !password) {
    res.json({
      status: "failed",
      message: "username or password can not be empty"
    });
  }
  let password_md5 = md5(password);
  let password_sha256 = sha256(password);
  let sql = mysql.query(
    "update user set password_md5 = ?, password_sha256 = ?, email = ?, address = ?,gender = ?, real_name = ? where username = ?",
    [password_md5, password_sha256, email, address, gender, realName, username],
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!result) {
        console.log("error, no result");
        return;
      }
      if (result) {
        console.log(result);
      }
      userLog(username, "modifyInfo");
      res.json({
        status: "success",
        message: "modifyInfo success"
      });
    }
  );
  console.log(sql.sql);
});

module.exports = router;
