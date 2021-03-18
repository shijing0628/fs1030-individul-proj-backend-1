const express = require("express");
const app = express();
const mysql = require("mysql");

var cors = require("cors");

const {
  routeNotExistError,
  globalError,
} = require("././middleware/errorHandler");

//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//connect to mysql database
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   port: 3306,
//   password: "Password",
//   database: "portfolio_brenda",
//   queueLimit: 0, // unlimited queueing
//   connectionLimit: 10, // unlimited connections
// });

// const sql = db.connect((err) => {
//   if (!err) {
//     console.log("mysql db is connected");
//   } else {
//     console.log("db connection failed");
//     console.log(err);
//   }
// });

//routes
const userRoute = require("./src/routes/user");
const entriesRoute = require("./src/routes/contact-form");
const authRoute = require("./src/routes/auth");
const portfolioRoute = require("./src/routes/portfolio");

// middleware to catch non-existing routes

app.use("/users", userRoute);
app.use("/contact_form", entriesRoute);
app.use("/auth", authRoute);
app.use("/portfolio", portfolioRoute);

//check if route exist middleware
app.use("*", routeNotExistError);

//Global error handler
app.use(globalError);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on ${PORT}...`));

// module.export = db;
