import Express from "express";

import Router from "./src/route";
import bodyParser = require("body-parser");

let app = Express();
app.use(bodyParser.json());
app.get(
  "/status",
  (_, res): void => {
    res.send({ date: new Date() });
  },
);
app.use("/info", Router.InfoRouter);
app.listen(3000);
