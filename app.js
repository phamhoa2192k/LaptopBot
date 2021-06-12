require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var userRouter = require("./routes/user");
var queryRouter = require("./routes/query");
var adminRouter = require("./routes/admin")
var webhookRouter = require("./routes/webhook")
var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", userRouter);
app.use("/query", queryRouter);
app.use("/admin", adminRouter)
app.use("/webhook", webhookRouter)

module.exports = app;
