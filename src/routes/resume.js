// This file is for resume page CRUD
const express = require("express");
const db = require("../../connection");
const router = express.Router();

router.post("/create", (req, res) => {
  const language = req.body.language;
  const address = req.body.address;
  const info = req.body.info;

  db.query(
    "INSERT INTO resume(language, address, info) VALUES (?,?,?)",
    [language, address, info],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("resume value is inserted successfully.");
        res.json(result);
      }
    }
  );
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM resume", (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log("get all resume data successfully.");
      res.json(result);
    }
  });
});

router.put("/update", (req, res) => {
  const language = req.body.language;
  const address = req.body.address;
  const info = req.body.info;

  db.query(
    "UPDATE resume SET language=?, address=?, info=?",
    [language, address, info],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("update resume task info successfully.");
        res.json(result);
      }
    }
  );
});

router.delete("/delete", (req, res) => {
  db.query("DELETE FROM resume", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("delete resume info successfully.");
      res.send(result);
    }
  });
});

module.exports = router;
