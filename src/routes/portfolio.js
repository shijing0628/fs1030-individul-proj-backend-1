// This file is for portfolio page CRUD

const express = require("express");
const db = require("../../connection");
const router = express.Router();

router.post("/create", (req, res) => {
  const proj_name = req.body.projectName;
  const proj_desc = req.body.projectDesc;
  const creator_name = req.body.creatorName;
  const image = req.body.image;
  const date_completed = req.body.createDate;

  db.query(
    "INSERT INTO portfolio(proj_name, proj_desc, creator_name, image, date_completed) VALUES (?,?,?,?,?)",
    [proj_name, proj_desc, creator_name, image, date_completed],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("value is inserted successfully.");
        res.json(result);
      }
    }
  );
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM portfolio", (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log("get all portfolio data successfully.");
      res.json(result);
    }
  });
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  db.query(`SELECT * FROM portfolio WHERE id=${id}`, (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      res.json(result);
      console.log("get id data successfully.");
    }
  });
});
router.put("/update/:id", (req, res) => {
  const proj_name = req.body.proj_name;
  const proj_desc = req.body.proj_desc;
  const creator_name = req.body.creator_name;
  const image = req.body.image;
  const date_completed = req.body.date_completed;

  db.query(
    "UPDATE portfolio SET proj_name=?, proj_desc=?, creator_name=?,image=?, date_completed=? WHERE id=?",
    [proj_name, proj_desc, creator_name, image, date_completed, req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("update portfolio task info successfully.");
        res.json(result);
      }
    }
  );
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM portfolio WHERE id =?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("delete 1 project successfully.");
      res.json(result);
    }
  });
});

module.exports = router;
