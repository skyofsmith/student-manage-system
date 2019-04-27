const express = require("express");
const app = express();
const CROS = require("./utils/cros");
const register = require("./routers/register");
const deleteUser = require("./routers/delete");

app.use(express.json());
app.use(CROS);
app.use("/user", register);
app.use("/user", deleteUser);

app.listen(8079, () => {
  console.log("server start up!");
});
