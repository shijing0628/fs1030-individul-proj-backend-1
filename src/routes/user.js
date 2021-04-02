const express = require("express");
const router = express.Router();
// const { v4: uuidv4 } = require("uuid");
const dbHandler = require("../dbhandler/dbHandler");
const bcrypt = require("bcrypt");
const { validationCheckUser } = require("../../middleware/validationCheck");
const saltRounds = 10;
const db = require("../../connection");
const { stringify } = require("flatted");
router.use(validationCheckUser);

//user post request
router.post("/", validationCheckUser, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // let usersData = await dbHandler.getUsersData()

    let usersData = await db.query("SELECT * FROM users");
    let getUsersData = stringify(usersData);
    console.log("get all users data successfully.");
    // res.status(200).json({ getUsersData });

    if (getUsersData.length > 0) {
      //const emailExist = await usersData.find((item) => item.email == email);
      await db.query(
        `SELECT email FROM users WHERE email='${email}'`,
        (err, result) => {
          if (result.length > 0) {
            console.log("Find existed email in DB.");
            return res
              .status(409)
              .json({ message: "Email already exists.", status: "FAILED" });
          } else {
            let hashedPW = bcrypt.hashSync(password, saltRounds);
            db.query(
              "INSERT INTO users(name,email,password) VALUES (?,?,?)",
              [name, email, hashedPW],
              (err, userRegister) => {
                if (err) {
                  console.log(err);
                  throw err;
                } else {
                  console.log(
                    "contact form info is inserted successfully when DB is empty."
                  );
                  return res
                    .status(201)
                    .json({ userRegister, status: "SUCCESS" });
                }
              }
            );
          }
        }
      );

      // return res.status(200).json({ EmailExist });

      // let userRegister = {
      //   id: uuidv4(),
      //   name,
      //   email,
      //   password: hashedPW,
      // };

      // await dbHandler.addUserData(userRegister);
      // return res
      //   .status(200)
      //   .send({
      //     id: userRegister.id,
      //     name: userRegister.name,
      //     email: userRegister.email,
      //     status: "SUCCESS",
      //   });
      // else {

      //}
    } else {
      // let userRegister = {
      //   id: uuidv4(),
      //   name,
      //   email,
      //   password: hashedPW,
      // };
      // await dbHandler.addUserData(userRegister);
      // return res.status(200).send({
      //   id: userRegister.id,
      //   name: userRegister.name,
      //   email: userRegister.email,
      //   status: "SUCCESS",
      // });
      let hashedPW = await bcrypt.hash(password, saltRounds);
      await db.query(
        "INSERT INTO users(name,email,password) VALUES (?,?,?)",
        [name, email, hashedPW],
        (err, userRegister) => {
          if (err) {
            console.log(err);
            throw err;
          } else {
            console.log("contact form info is inserted successfully.");
            res.status(201).json({ userRegister, status: "SUCCESS" });
          }
        }
      );
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message, status: "FAILED" });
  }
});

module.exports = router;
