var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var methodOverride = require("method-override");
var seedDB = require("./seeds");
var request = require("request");
const MongoClient = require("mongodb").MongoClient;
var Guide = require("./models/guide");
var seedDB1 = require("./seeds1");

app.use(bodyparser.urlencoded({ extended: true }));

//seedDB();
//seedDB1();

mongoose.connect("mongodb+srv://SINGHHR:hello123@cluster0-4497t.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true});
mongoose.set("useFindAndModify", false);

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(express.static("./library"));
app.use(methodOverride("_method"));

// PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// ========================
// ROUTES
// ========================

app.get("/", function(req, res) {
  res.redirect("/home");
});

app.get("/home", function(req, res) {
  res.render("home");
});

app.get("/safehouse", function(req, res) {
  res.render("safehouses");
});

// Location
// ========================

//Places Search Nearby
app.get("/search", function(req, res) {
  var url =
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" +
    req.query.s +
    "&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyDZc99u5sdXOCYQUDqkyju1EK3Jyb-hJbU";
  request(url, function(err, resp, body) {
    if (!err && resp.statusCode == 200) {
      body = JSON.parse(body);
      res.render("geoLocation", {
        data: body
      });
    }
  });
});

app.get("/searchLocation", function(req, res) {
  res.render("trackerLocation");
});

app.get("/getLocation", function(req, res) {
  res.render("getLocation");
});

app.get("/geolocation", function(req, res) {
  var ip = req.query.ip;
  var url = "http://ip-api.com/json/" + ip;
  console.log(url);
  request(url, function(err, response, body) {
    if (!err && response.statusCode == 200) {
      var data = JSON.parse(body);
      var latitude = String(data["lat"]);
      var longitude = String(data["lon"]);
      res.render("geoLocation", { latitude: latitude, longitude: longitude });
    }
  });
});

// =========================
// SOS
// =========================

app.get("/sos", function(req, res) {
  res.render("SOS");
});

app.get("/loc", function(req, res) {
  var lat = req.query.lat;
  var lng = req.query.lng;
  var url =
    "mailto:wecare2020@gmail.com?subject=I am in Danger&body=I am sending you my location. My current latitude is " +
    lat +
    " and longitude is " +
    lng;
  res.redirect(url);
});

// =================
// Authentication
// =================
app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/signup", function(req, res) {
  res.render("signup");
});

app.post("/signup", function(req, res) {
  var newUser = new User({
    username: req.body.username,
    dob: req.body.dob,
    email: req.body.email,
    bio: req.body.bio,
    image: req.body.image,
    phoneNumber: req.body.phoneNumber
  });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render("signup");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/home");
    });
  });
});

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/home");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login"
  }),
  function(req, res) {}
);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// ====================
// USER
// ====================

app.get("/user/:id", function(req, res) {
  User.findById(req.params.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      res.render("user", { user: foundUser });
    }
  });
});

app.put("/user/:id", function(req, res) {
  var updatedUser = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    bio: req.body.bio,
    image: req.body.image,
    phoneNumber: req.body.phoneNumber
  };

  User.findByIdAndUpdate(req.params.id, updatedUser, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      var showUrl = "/user/" + foundUser._id;
      foundUser.save();
      res.redirect(showUrl);
    }
  });
});

app.get("/user/:id/settings", function(req, res) {
  User.findById(req.params.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      res.render("setting", { user: foundUser });
    }
  });
});

app.get("/lftb", function(req, res) {
  res.render("ltfb");
});

app.get("/comp", function(req, res) {
  res.render("comp");
});

app.get("/data", function(req, res) {
  res.render("data");
});

app.get("/help", function(req, res) {
  res.render("helpline");
});

app.get("/landing", function(req, res) {
  res.render("landing");
});

// var guidesRoutes=require("./routes/guides");
//mongoose.connect("mongodb://localhost/hello-demo");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/Public"));

// Guide.create(
// 		{	firstName: "PRIYANKA",
// 		 	lastName: "SHARMA",
// 		 	email: "EFG@gmail.com",
// 		 	phone: "54541",
// 		 	password: "ABBCD",
// 		 	location: "motinagsar"
// 		},function(err, guide){
// 			if(err){
// 				console.log(err);
// 			}else{
// 				console.log("HELLO NEW GUIDE!");
// 				console.log(guide);
// 			}
// 	});

app.get("/", function(req, res) {
  res.render("landing");
});

app.use("/Public", express.static("Public"));

app.get("/be-a-guide", function(req, res) {
  res.render("be-a-guide");
});

app.post("/be-a-guide", function(req, res) {
  //get data from form
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var password = req.body.password;
  var phone = req.body.phone;
  var location = req.body.location;
  var docfile = req.body.docfile;
  var picfile = req.body.picfile;

  var newGuide = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    phone: phone,
    location: location,
    picfile: picfile,
    docfile: docfile
  };
  // password: password, phone: phone, file: file

  //create guide and save to DB
  Guide.create(newGuide, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      // res.send("form filled");
      res.redirect("/");
    }
  });
});

//////////shows more info about guide/////////////////
app.get("/want-a-guide/:id", function(req, res) {
  // res.render("show");
  Guide.findById(req.params.id, function(err, foundGuide) {
    if (err) {
      console.log(err);
    } else {
      res.render("show", { guide: foundGuide });
    }
  });
});

app.get("/want-a-guide", function(req, res) {
  ///get all guides from db///
  Guide.find({}, function(err, allGuides) {
    if (err) {
      console.log(err);
      var Guide = require("./models/guide");
      var Guide = require("./models/guide");
    } else {
      console.log(allGuides);
      res.render("want-a-guide", { guides: allGuides });
    }
  });
});

app.listen(process.env.PORT || 3000, function(req, res) {
  console.log("Start");
});
