const express = require("express");
const app = express();
const CROS = require("./utils/cros");
const register = require("./routers/register");
const modifyInfo = require("./routers/modifyInfo");
const deleteUser = require("./routers/delete");

app.use(express.json());
app.use(CROS);
app.use("/user", register);
app.use("/user", modifyInfo);
app.use("/user", deleteUser);

app.listen(8079, () => {
  console.log("server start up!");
});
