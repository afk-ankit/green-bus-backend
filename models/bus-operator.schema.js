const mongoose = require("mongoose");
const OperatorSchema = new mongoose.Schema({
  company_name: String,
  coordinator_name: String,
  email: String,
  token: String,
  address: String,
  contact_number: String,
  years_of_service: Number,
});

const OperatorModel = new mongoose.model("Operator", OperatorSchema);

module.exports = OperatorModel;
