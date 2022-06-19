import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import logger from "morgan";

import index from "./routes";
import { dbURL } from "./config/db.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";

require("express-async-errors");

const app = express();
const port = process.env.PORT || 3001;
app.set("port", port);

// connect to mongodb
mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(port, () => {
      console.log(`connected to db and app started on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(`some thing went wrong:- ${error.message}`);
    process.exit();
  });

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", index);
app.use(errorHandler);

export default app;
