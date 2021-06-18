const path = require("path");

const express = require("express");
const dotenv = require("dotenv");
// const logger = require('./src/middleware/logger');
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const errorHandler = require("./server/middleware/error");
const connectDB = require("./config/db");

//Route files
const admin = require("./server/routes/admin");
const user = require("./server/routes/user");
const doctor = require("./server/routes/doctor");
const healthCenter = require("./server/routes/healthCenter");
const notice = require("./server/routes/notice");
const history = require("./server/routes/history");
const note = require("./server/routes/notes");

const auth = require("./server/routes/auth");

// import cors
var cors = require("cors");
//Connect Db
connectDB();
const app = express(cors({ origin: "*" }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

//Load env vars
dotenv.config({ path: "./config/config.env" });

const http = require("https"); //add lter
var fs = require("fs"); //addded later

//Connect Db
// connectDB(); // uncomment after removing cors

// const app = express();

//Body parser

app.use(express.json());
// app.use(logger);
//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//File uploading
app.use(fileupload());

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Mount routers
app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api/doctor", doctor);
app.use("/api/notice", notice);
app.use("/api/healthCenter", healthCenter);
app.use("/api/admin", admin);
app.use("/api/history", history);
app.use("/api/note", note);

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  process.env.IP_ADD,
  // '192.168.1.164',
  // '192.168.1.158',
  // '192.168.10.224',
  // '192.168.1.121',
  console.log(
    "Server running in " + process.env.NODE_ENV + " mode on port " + PORT
  )
);
