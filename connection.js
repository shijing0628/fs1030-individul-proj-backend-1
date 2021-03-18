const mysql = require("mysql");

//connect to mysql database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "Password",
  database: "portfolio_brenda",
  queueLimit: 0, // unlimited queueing
  connectionLimit: 10, // unlimited connections
});

const sql = db.connect((err) => {
  if (!err) {
    console.log("mysql db is connected");
  } else {
    console.log("db connection failed");
    console.log(err);
  }
});

module.exports = db;
