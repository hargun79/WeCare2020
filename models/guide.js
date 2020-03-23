var mongoose = require("mongoose");

mongoose.connect("mongodb+srv://SINGHHR:hello123@cluster0-4497t.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true});
mongoose.set("useFindAndModify", false);

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
