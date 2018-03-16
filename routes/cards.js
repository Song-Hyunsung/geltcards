var express = require("express");
var router = express.Router();
var Card = require("../models/card");




//=============== CARDS INDEX ROUTE, LIST ALL CARDS ===============//
router.get("/", function(req, res){
    Card.find({}, function(err, allCards){
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
            res.render("cards/index", {cards : allCards});
        }
    })
})

//=============== CARDS POST ROUTE, ADD CARD TO DB  ===============//
router.post("/", function(req, res){
    Card.create(req.body.newCard, function(err, createdCard){
        if(err){
            console.log(err);
        } else {
            res.redirect("/cards");
        }
    })
})

//============= CARDS NEW ROUTE, SHOW FORM ADDING CARD ============//
router.get("/new", function(req, res){
    res.render("cards/new");
})


module.exports = router;