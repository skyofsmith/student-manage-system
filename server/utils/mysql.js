const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "student_manage_system"
});
if (!connection.isConnected) {
  connection.connect();
  connection.isConnected = true;
}
module.exports = connection;
