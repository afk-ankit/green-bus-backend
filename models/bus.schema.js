const mongoose = require("mongoose");
const BusSchema = new mongoose.Schema({
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
  last_week_income: [
    {
      date: Date,
      income: Number,
    },
  ],
  staff: [
    {
      id: Number,
      name: String,
      role: String,
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

const BusModel = new mongoose.models("User", BusSchema);

module.exports = BusModel;
