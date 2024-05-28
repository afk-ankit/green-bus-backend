const mongoose = require("mongoose");
const BusSchema = new mongoose.Schema({
  operator: { type: mongoose.Schema.Types.ObjectId, ref: "Operator" },
  bus_no: String,
  source: [String],
  destination: [String],
  fare: Number,
  departure_time: [Date],
  arrival_time: [Date],
  available_dates: [Date],
  distance: { type: Map, of: Number },
  bus_type: String,
  total_seats: Number,
  availabe_seats: [String],
  staff: [
    {
      id: Number,
      name: String,
      role: String,
      contact_number: String,
    },
  ],
  seat_layout: {
    lower: {
      first: [[Number]],
      second: [Number],
    },
    upper: {
      first: [[Number]],
      second: [Number],
    },
  },
});

const BusModel = new mongoose.model("Bus", BusSchema);

module.exports = BusModel;
