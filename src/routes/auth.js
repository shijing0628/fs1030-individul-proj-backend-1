const express = require("express");
const router = express.Router();
//const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//const dbHandler = require("../dbhandler/dbHandler");
const { validationCheckAuth } = require("../../middleware/validationCheck");
const db = require("../../connection");
router.use(validationCheckAuth);
const { stringify } = require("flatted");
const maxAge = 3 * 24 * 60 * 60 * 1000;
router.post("/", validationCheckAuth, async (req, res) => {
  try {
    const { email, password } = req.body;

    //let authDatas = await dbHandler.getUsersData()
    // let authDatas = await db.query("SELECT * FROM users", (err, usersData) => {
    //   if (err) {
    //     console.log(err);
    //     throw err;
    //   } else {
    //     console.log("get all users data successfully.");
    //     console.log(usersData);
    //      return res.status(200).json({ usersData });
    //   }
    // });

    // let authDatas = db.query("SELECT * FROM users");
    // let getAuthData = stringify(authDatas);
    // console.log("get all users data successfully.");

    //let validPass = await bcrypt.compare(password, user.password);
    if (email) {
      db.query(`SELECT * FROM users WHERE email='${email}'`, (err, user) => {
        if (err) throw err;
        else {
          if (user.length === 0) {
            return res.status(401).json({
              message: `Incorrect credentials provided for ${email}`,
              status: "FAILED",
              type: "email",
            });
          } else {
            db.query(
              `SELECT password FROM users WHERE email='${email}'`,
              (err, hashp) => {
                if (err) throw err;
                console.log("DB p", hashp);
                console.log(password);
                bcrypt.compare(password, hashp).then(function (validPass) {
                  console.log(validPass);
                  if (!validPass)
                    return res.status(401).json({
                      message: `Incorrect credentials provided for ${password}`,
                      status: "FAILED",
                      type: "password",
                    });
                  // const token = jwt.sign(
                  //   { id: user.id },
                  //   process.env.TOKEN_SECRET,
                  //   {
                  //     expiresIn: maxAge,
                  //   }
                  // );
                  // if (token) {
                  //   res
                  //     .status(201)
                  //     .json({ token, status: "SUCCESS", data: user });
                  // } else {
                  //   return res.status(400).json({
                  //     message: "Cannot generate token.",
                  //     status: "FAILED",
                  //   });
                  // }
                });
              }
            );
            let getAuthData = stringify(user);
            // let validPass = bcrypt.compare(password, p);
            const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
              expiresIn: maxAge,
            });

            if (token) {
              res
                .status(201)
                .json({ token, status: "SUCCESS", data: getAuthData });
            } else {
              return res.status(400).json({
                message: "Cannot generate token.",
                status: "FAILED",
              });
            }
          }
        }
      });
    } else {
      return res.status(400).json({
        message: "register at first  then try again.",
        status: "FAILED",
      });
    }

    // if (authDatas) {
    //   //let user = authDatas.find((item) => item.email === email);
    //   let user = await db.query(
    //     `SELECT email FROM users WHERE email='${email}'`,
    //     (err, emailData) => {
    //       if (err) {
    //         console.log(err);
    //         throw err;
    //       } else {
    //         console.log("Find existed email in DB.");
    //         return res.status(200).json({ emailData });
    //       }
    //     }
    //   );

    // if (!user)
    //   return res.status(401).json({
    //     message: `Incorrect credentials provided for ${email}`,
    //     status: "FAILED",
    //     type: "email",
    //   });

    // if (!validPass)
    //   return res.status(401).json({
    //     message: `Incorrect credentials provided for ${password}`,
    //     status: "FAILED",
    //     type: "password",
    //   });

    // create a token
    // const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
    //   expiresIn: maxAge,
    // });

    // if (token) {
    //   res.status(201).json({ token, status: "SUCCESS", data: authDatas });
    // } else {
    //   return res
    //     .status(400)
    //     .json({ message: "Cannot generate token.", status: "FAILED" });
    // }
    // } else {
    //   return res.status(400).json({
    //     message: "register at first  then try again.",
    //     status: "FAILED",
    //   });
    // }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message, status: "FAILED" });
  }
});

module.exports = router;
