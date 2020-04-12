var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb+srv://SINGHHR:hello123@cluster0-4497t.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true});
mongoose.set("useFindAndModify", false);

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  dob: { type: Date, default: Date.now },
  email: String,
  bio: String,
  image: String,
  phoneNumber: Number
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
