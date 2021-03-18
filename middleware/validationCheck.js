// general check if email, password etc is validated or not
function check(req, res, arr) {
 const errors = []
 var ereg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

 arr.forEach(item => {
  if (!req.body.hasOwnProperty(item) || req.body[item] == "") {
   errors.push(item)
  }
 })
 if (errors.length > 0) {
  return res.status(400).json({ message: "validation error", invalid: errors, status: 'FAILED' })
 }

 if (req.body.hasOwnProperty('password') && req.body.password.length < 8) {
  return res.status(400).json({ message: "Password must be minimum 8 characters.", status: 'FAILED' })
 }

 if (req.body.hasOwnProperty('email') && !ereg.test(req.body.email)) {
  return res.status(400).json({ message: "Must input valid email.", status: 'FAILED' })
 }
}


// route middleware for validation of userDB input
const validationCheckUser = (req, res, next) => {
 let arr = ["name", "password", "email"];
 check(req, res, arr)
 next()
}

// route middleware for validation of auth input
const validationCheckAuth = (req, res, next) => {
 let arr = ["password", "email"];
 check(req, res, arr)
 next()
}


// route middleware for validation of entrieDB input
const validationCheckEntry = (req, res, next) => {
 let arr = ["name", "email", "phoneNumber"];
 check(req, res, arr)
 next()
}

module.exports = {
 validationCheckUser,
 validationCheckAuth,
 validationCheckEntry
}