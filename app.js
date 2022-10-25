const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const filesRouter = require("./routes/filesRouter");
const showRouter = require("./routes/showRouter");
const downloadRouter = require("./routes/downloadRouter");
// const multer = require("multer");
const path = require("path");

const app = express();
//body parser
app.use(express.json());

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
//Routes
app.use("/api/v1/files", filesRouter);
app.use("/", showRouter);

app.use("/files/download", downloadRouter);

module.exports = app;
