var middlewareObj = {};
var Card = require("../models/card");

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/login");
    }
}

middlewareObj.checkCardOwnership = function checkCardOwnership(req, res, next){
    if(req.isAuthenticated()){
        Card.findById(req.params.id, function(err, foundCard){
            if(err){
                console.log(err);
                res.redirect("back");
            } else {
                // When campground is found with the id, see if it matches the owner
                // card model's id is defined as value in the object, user's _id is the mongoose generated _id
                if(foundCard.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        })
    } else {
        // When the user is not authenticated, meaning not logged in
        res.redirect("/login");
    }
}

module.exports = middlewareObj;