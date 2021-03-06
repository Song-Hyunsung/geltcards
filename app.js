var express        = require("express"),
    app            = express(),
    mongoose       = require("mongoose"),
    bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    User           = require("./models/user");
    
//========== Set up mongodb and view engine for ejs ==========//
// mongoose.connect("mongodb://localhost/geltcards"); LOCAL DB ON C9
mongoose.connect("mongodb://gelt:BalthasarGelt1!@ds123619.mlab.com:23619/geltcard");
app.set("view engine", "ejs");

//========== Set static directory & method override & body ==========//
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

//========== Set up express session ==========//
app.use(require("express-session")({
    secret: "Steel, Faith, Gunpowder",
    resave: false,
    saveUninitialized: false
}))

//========== Initialize passport local strategy with user model ==========//
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//========== Require routes =========//
var cardRoutes = require("./routes/cards");
var indexRoutes = require("./routes/index");
var commentRoutes = require("./routes/comments");

//========== Provide information for all ==========//
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

//========== Use routes ==========//
app.use("/", indexRoutes);
app.use("/cards", cardRoutes);
app.use("/cards/:id/comments", commentRoutes);

//========== Listen for server =========//
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Geltcard Server Started");
})