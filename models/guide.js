var mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://hello:world@cluster0-gjjsl.mongodb.net/test?retryWrites=true&w=majority"
);
var guideSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  password: String,
  location: String
});

// var Guide= mongoose.model("Guide", guideSchema);
module.exports = mongoose.model("Guide", guideSchema);
