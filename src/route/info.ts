import Express from "express";
import { isUndefined } from "util";

import AllkpopParser from "../lib/parser/allkpop";

const router = Express.Router();
router.post(
  "/allkpop",
  async (req, res): Promise<void> => {
    const url = req.body.url;
    if (isUndefined(url)) {
      res.sendStatus(400);
    } else {
      const result = await AllkpopParser(url);
      res.send(JSON.stringify(result));
    }
  },
);

export { router };
