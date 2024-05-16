const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("./db/conn");
const errorHandler = require("./utils/errorHandler");
connectDb();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(cors());
app.use(errorHandler);
app.listen(3001, () => {
  console.log("server running at http://localhost:8000 🔥");
});
