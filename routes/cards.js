var express = require("express");
var router = express.Router();




//=============== CARDS INDEX ROUTE, LIST ALL CARDS ===============//
router.get("/", function(req, res){
    res.render("cards/index");
})

//============= CARDS NEW ROUTE, SHOW FORM ADDING CARD ============//
router.get("/new", function(req, res){
    res.render("cards/new");
})


module.exports = router;