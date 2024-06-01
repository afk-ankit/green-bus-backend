const mongoose = require("mongoose");
const BusSchema = new mongoose.Schema({
  operator: { type: mongoose.Schema.Types.ObjectId, ref: "Operator" },
  bus_no: String,
  source: [String],
  destination: [String],
  fare: Number,
  departure_time: [Date],
  arrival_time: [Date],
  available_dates: [
    {
      date: Date,
      booked_seats: [Number],
    },
  ],
  distance: { type: Map, of: Number },
  bus_type: String,
  total_seats: Number,
  staff: [
    {
      id: Number,
      name: String,
      role: String,
      contact_number: String,
    },
  ],
});

const BusModel = new mongoose.model("Bus", BusSchema);

module.exports = BusModel;
