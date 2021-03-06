const routeNotExistError = (req, res) => {
  return res.status(404).json({ message: "not found" });
};

const globalError = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err.stack);
  return res.status(500).send({ error: "Unexpected error found" });
};

var problemMiddleware = function (request, response, next) {
  response.setHeader("Content-Type", "application/json");
  next();
};

module.exports = { routeNotExistError, globalError, problemMiddleware };
