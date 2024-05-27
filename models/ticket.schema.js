const mongoose = require("mongoose");
const TicketSchema = new mongoose.Schema({
  price: Number,
  booking_date: Date,
  bus_id: String,
  user_id: String,
  passenger_details: [
    {
      seat_no: String,
      name: String,
      age: Number,
      sex: String,
    },
  ],
});

const TicketModel = new mongoose.models("User", TicketSchema);

module.exports = TicketModel;
