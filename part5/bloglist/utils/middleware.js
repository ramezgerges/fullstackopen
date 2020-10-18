const morgan = require("morgan");
const logger = require("./logger");

morgan.token("json", (req) => {
  if (
    req.method === "POST" &&
    "content-type" in req.headers &&
    req.headers["content-type"].includes("application/json")
  ) {
    return JSON.stringify(req.body);
  }
  return null;
});
const requestLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms :json"
);

const tokenDecoder = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  } else req.token = null;
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, ignore) => {
  logger.error(error.message);

  if (error.name === "CastError")
    return res.status(400).send({ error: error.message });

  if (error.name === "DocumentNotFoundError") return res.status(404).end();

  if (error.name === "ValidationError")
    return res.status(400).json({ error: error.message });

  if (error.name === "JsonWebTokenError")
    return res.status(401).json({
      error: "invalid token"
    });

  return res.status(500).end();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  requestLogger,
  tokenDecoder
};
