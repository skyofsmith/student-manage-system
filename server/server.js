const app = require("express")();
const CROS = require("./utils/cros");
const register = require("./routers/register");

app.use(CROS);
app.use("/user", register);

app.listen(8079, () => {
  console.log("server start up!");
});
