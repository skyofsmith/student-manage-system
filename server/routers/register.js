const express = require("express");
const mysql = require("../utils/mysql");
const userLog = require("../utils/logUser");
const { md5, sha256 } = require("../utils/hash");

const router = express.Router();

router.post("/register", (req, res) => {
  console.log("post: /register", req.body);
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
  mysql.query(
    "select * from user where username = ?",
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!result) {
        console.log("error, no result");
        return;
      }
      if (result.length) {
        console.log("error, user already exist");
        res.json({
          status: "failed",
          message: "user already exist"
        });
        return;
      }
      mysql.query(
        "insert into user set username = ?, password_md5 = ?, password_sha256 = ?, email = ?, address = ?,gender = ?, real_name = ?",
        [
          username,
          password_md5,
          password_sha256,
          email,
          address,
          gender,
          realName
        ],
        (err, result) => {
          if (err) {
            console.log(err);
            res.json({
              status: "failed",
              message: ""
            });
            return;
          }
          if (result) {
            console.log(result);
          }
          userLog(username, "register");
          res.json({
            status: "success"
          });
        }
      );
    }
  );
});

module.exports = router;
