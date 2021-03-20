// This file is for resume page CRUD
const express = require("express");
const db = require("../../connection");
const router = express.Router();

router.post("/create", (req, res) => {
  const companyName = req.body.companyName;
  const job_title = req.body.jobTitle;
  const job_desc = req.body.jobDesc;
  const company_image = req.body.companyImage;
  const work_date = req.body.workDate;

  db.query(
    "INSERT INTO resume(companyName,job_title,job_desc,company_image,work_date) VALUES (?,?,?,?,?)",
    [companyName, job_title, job_desc, company_image, work_date],
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
router.get("/:id", (req, res) => {
  let id = req.params.id;
  db.query(`SELECT * FROM resume WHERE id=${id}`, (err, result) => {
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
  const companyName = req.body.companyName;
  const job_title = req.body.job_title;
  const job_desc = req.body.job_desc;
  const company_image = req.body.company_image;
  const work_date = req.body.work_date;

  db.query(
    "UPDATE resume SET companyName=?, job_title=?, job_desc=?, company_image=?,work_date=? WHERE id=?",
    [companyName, job_title, job_desc, company_image, work_date, req.params.id],
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

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM resume WHERE id =?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("delete 1 resume info successfully.");
      res.send(result);
    }
  });
});

module.exports = router;
