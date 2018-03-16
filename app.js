var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/geltcards");

var cardRoutes = require("./routes/cards");
var indexRoutes = require("./routes/index");

app.use("/", indexRoutes);
app.use("/cards", cardRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Geltcard Server Started");
})