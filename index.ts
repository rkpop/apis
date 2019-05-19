import Express from "express";

import InfoRoutes from "./src/route/info";
import bodyParser = require("body-parser");

let app = Express();
app.use(bodyParser.json());
app.get(
  "/status",
  (_, res): void => {
    res.send({ date: new Date() });
  },
);
app.use("/info", InfoRoutes);
app.listen(3000);
