import express, { Request, Response } from "express";
import { view } from "./view";

const main = async () => {
  const app = express();
  const port = 3000;

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello");
  });

  view();

  app.listen(port, () => {
    console.log(`🚀 started at  http://localhost:${port}`);
  });
};

main();
