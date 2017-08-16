var express = require("express");
var router = require("./controller")
var app = express();
app.listen(4000);
app.set("view engine","ejs");
app.use(express.static("./public"));
app.use(express.static("./uploads"));
app.get("/",router.showIndex);
app.get("/:dirName",router.showDir);
app.get("/up",router.upFiles);
app.post("/upOk",router.upFilesOk);