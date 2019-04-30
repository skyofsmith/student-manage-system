const mysql = require("./mysql");

module.exports = function(username, option) {
  console.log("post: log");
  if (!username || !option) {
    return;
  }
  const sql = mysql.query(
    "insert into log(username, type, date) values(?, ?, now())",
    [username, option],
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!result) {
        console.log("error, no result");
        return;
      }
      if (!result) {
        console.log("error, log failed");
      }
    }
  );
  console.log(sql.sql);
};
