var express       = require("express"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    expressSession= require("express-session"),
    User          = require("./models/userModel"),
    Blog          = require("./models/blogModel"),
    bodyParser    = require("body-parser"),
    app           = express();


 //var data = {
   //title:"Test Title"
// }

// Routes Requiring
var siteRoutes = require('./routes/siteRoutes'),
    blogRoutes = require('./routes/blogRoutes'),
    adminRoutes = require('./routes/adminRoutes');


//App Config
mongoose.connect("mongodb://localhost:27017/MyBlogApp",{ useNewUrlParser: true });
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

// passport Config
app.use(require("express-session")({
  secret: "this is our secret sentence",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Share current Info within all routes
app.use(function (req, res, next) {
  res.locals.currentUser=req.user;
  next();
});

// Routes Usage

app.use(siteRoutes);
app.use(blogRoutes);
app.use(adminRoutes);

var server = app.listen(3000, function (err) {
  if (err) {
    console.log(err);
  }
  console.log("App started on port 3000");
});
