var express = require("express");
var router = express.Router();
var Card = require("../models/card");
var middleware = require("../middleware"); // This automatically requires index.js in the middleware directory

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
router.post("/", middleware.isLoggedIn, function(req, res){
    var newCard = req.body.newCard;
    newCard.author = {
        id: req.user._id,
        username: req.user.username
    }
    console.log(newCard);
    Card.create(req.body.newCard, function(err, createdCard){
        if(err){
            console.log(err);
        } else {
            res.redirect("/cards");
        }
    })
})

//============= CARDS NEW ROUTE, SHOW FORM ADDING CARD ============//
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("cards/new");
})

//============= CARDS SHOW ROUTE, SHOW DETAIL INFO CARD ============//
router.get("/:id", function(req, res){
    Card.findById(req.params.id).populate("comments").exec(function(err, foundCard){
        if(err){
            console.log(err);
            res.redirect("/cards");
        } else {
            res.render("cards/show", {card: foundCard});
        }
    })
})

//============= CARDS EDIT ROUTE, EDIT DETAIL INFO CARD ============//
router.get("/:id/edit", middleware.checkCardOwnership, function(req, res){
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
router.put("/:id", middleware.checkCardOwnership, function(req, res){
    Card.findByIdAndUpdate(req.params.id, req.body.card, function(err, updatedCard){
        if(err){
            res.redirect("/cards");
        } else {
            res.redirect("/cards/" + req.params.id);
        }
    })
})

//========== CARDS DELETE ROUTE, DELETE CARD FROM DATABASE ===========//
router.delete("/:id", middleware.checkCardOwnership, function(req, res){
    Card.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/cards");
        } else {
            res.redirect("/cards");
        }
    })
})


module.exports = router;