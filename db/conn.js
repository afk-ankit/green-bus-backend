const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect(
      "mongodb+srv://ankit:ankit@cluster0.wt0xt6q.mongodb.net/greenBus?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("successfully connected to the database");
    })
    .catch(() => {
      console.log("Can't connect to db");
    });
};

module.exports = connectDb;
