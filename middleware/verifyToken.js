const jwt = require('jsonwebtoken');


function auth(req, res, next) {
 const authHeader = req.headers["authorization"];
 const token = authHeader && authHeader.split(" ")[1];
 if (token == null) {
  return res.status(400).send({ message: "Token not provided." });
 }
 try {
  const verified = jwt.verify(token, process.env.TOKEN_SECRET);

  req.id = verified._id
  next();
 } catch (err) {
  console.error(err);
  return res.status(401).send({ message: err.message });
 }

}

module.exports = auth