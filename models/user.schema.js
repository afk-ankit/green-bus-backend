const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: String,
  contact_number: String,
  email: String,
  age: Number,
  address: String,
  password: String,
});

const UserModel = new mongoose.model("User", UserSchema);

module.exports = UserModel;
