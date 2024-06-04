const mongoose = require("mongoose");
const PassengerSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  contact_number: String,
  age: Number,
  sex: String,
});

const PassengerModel = new mongoose.model("Passenger", PassengerSchema);

module.exports = PassengerModel;
