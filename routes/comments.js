var express = require("express");
var router = express.Router({mergeParams: true});  // This allows access of :id from app.js
var Card = require("../models/card");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//========== COMMENT NEW ROUTE SHOWS NEW COMMENT FORM ==========//
router.get("/new", middleware.isLoggedIn, function(req, res){
    Card.findById(req.params.id, function(err, card){
        if(err){
            console.log(err);
            res.redirect("/cards/" + req.params.id);
        } else {
            res.render("comments/new", {card: card});
        }
    })
})

//========== COMMENT CREATE ROUTE POST ==========//
router.post("/", middleware.isLoggedIn, function(req, res){
    Card.findById(req.params.id, function(err, card){
        if(err){
            console.log(err);
            res.redirect("/cards");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                    res.redirect("/cards");
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    card.comments.push(comment);
                    card.save();
                    res.redirect("/cards/" + card._id);
                }
            })
        }
    })
})

//========== COMMENT EDIT ROUTE SHOW FORM ==========//
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {cardID: req.params.id, comment: foundComment});
        }
    })
})

//========== COMMENT UPDATE ROUTE ==========//
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/cards/" + req.params.id);
        }
    })
})

//========== COMMENT DELETE ROUTE ==========//
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/cards/" + req.params.id);
        }
    })
})


module.exports = router;