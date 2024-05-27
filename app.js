const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("./db/conn");
const errorHandler = require("./utils/errorHandler");
const routes = require("./routes");

connectDb();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(errorHandler);

app.use(routes);

app.listen(8000, () => {
  console.log("server running at http://localhost:8000 🔥");
});
