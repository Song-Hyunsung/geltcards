var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//========== Landing route ==========//
router.get("/", function(req, res){
    res.render("landing");
})

//========== Register routes ==========//
router.get("/register", function(req, res){
    res.render("register");
})

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/cards");
            })
        }
    })
})

//========== Login routes ==========//
router.get("/login", function(req, res){
    res.render("login");
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/cards",
    failureRedirect: "/login"
}), function(req, res){
    // Authentication is done at middleware, callback is empty
})

//========== Logout routes ==========//
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/cards");
})

module.exports = router;