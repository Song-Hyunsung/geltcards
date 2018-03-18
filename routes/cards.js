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

//============= CARDS SHOW ROUTE, SHOW DETAIL INFO CARD ============//
router.get("/:id", function(req, res){
    Card.findById(req.params.id, function(err, foundCard){
        if(err){
            console.log(err);
            res.redirect("/cards");
        } else {
            res.render("cards/show", {card: foundCard});
        }
    })
})

//============= CARDS EDIT ROUTE, EDIT DETAIL INFO CARD ============//
router.get("/:id/edit", function(req, res){
    Card.findById(req.params.id, function(err, foundCard){
        if(err){
            console.log(err);
            res.redirect("/cards/:id");
        } else {
            res.render("cards/edit", {card: foundCard});
        }
    })
})

//=========== CARDS UPDATE ROUTE, UPDATE DETAIL INFO CARD ===========//
router.put("/:id", function(req, res){
    Card.findByIdAndUpdate(req.params.id, req.body.card, function(err, updatedCard){
        if(err){
            res.redirect("/cards");
        } else {
            res.redirect("/cards/" + req.params.id);
        }
    })
})

//========== CARDS DELETE ROUTE, DELETE CARD FROM DATABASE ===========//
router.delete("/:id", function(req, res){
    Card.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/cards");
        } else {
            res.redirect("/cards");
        }
    })
})


module.exports = router;