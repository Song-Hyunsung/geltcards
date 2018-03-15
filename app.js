var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

var cardRoutes = require("./routes/cards");
var indexRoutes = require("./routes/index");

app.use("/", indexRoutes);
app.use("/cards", cardRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Geltcard Server Started");
})