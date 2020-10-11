const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const config = require("./utils/config");

logger.info("connecting to", config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => logger.info("connected to MongoDB"))
  .catch((error) => logger.error("MongoDB connection error: ", error.message));

const app = express();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenDecoder);
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
