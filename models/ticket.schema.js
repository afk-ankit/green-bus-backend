const mongoose = require("mongoose");
const TicketSchema = new mongoose.Schema({
  price: Number,
  booking_date: Date,
  bus_id: { type: Schema.Types.ObjectId, ref: "Bus" },
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
});

const TicketModel = new mongoose.model("Ticket", TicketSchema);

module.exports = TicketModel;
