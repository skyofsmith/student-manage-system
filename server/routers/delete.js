const express = require("express");
const mysql = require("../utils/mysql");
const userLog = require("../utils/logUser");
const { md5, sha256 } = require("../utils/hash");

const router = express.Router();

router.post("/delete", (req, res) => {
  console.log("/delete", req.body);
  let { username, password } = req.body;
  if (!username || !password) {
    res.json({
      status: "failed",
      message: "username or password can not be empty"
    });
    return;
  }
  let password_md5 = md5(password);
  let password_sha256 = sha256(password);
  mysql.query(
    "select * from user where username = ? and password_md5 = ? and password_sha256 = ?",
    [username, password_md5, password_sha256],
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
        return;
      }
      mysql.query(
        "delete from user where username = ? and password_md5 = ? and password_sha256 = ?",
        [username, password_md5, password_sha256],
        (err, result) => {
          if (err) {
            console.log(err);
            res.json({
              status: "failed",
              message: "username or password not correct"
            });
            return;
          }
          if (!result) {
            res.json({
              status: "failed",
              message: "delete failed"
            });
            return;
          }
          userLog(username, "delete");
          res.json({
            status: "success",
            message: "delete success"
          });
        }
      );
    }
  );
});
module.exports = router;
