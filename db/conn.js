const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/greenBus")
    .then(() => {
      console.log("successfully connected to the database");
    })
    .catch(() => {
      console.log("Can't connect to db");
    });
};

module.exports = connectDb;
