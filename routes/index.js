const express = require("express");
const router = express.Router();
const userRoute = require("./User/user.route");
const passengerRoute = require("./Passenger/passenger.route");
const operatorRoute = require("./Operator/operator.route");
const defaultRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/user/passenger",
    route: passengerRoute,
  },
  {
    path: "/operator",
    route: operatorRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
