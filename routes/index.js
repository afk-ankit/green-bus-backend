const express = require("express");
const router = express.Router();
const userRoute = require("./User/user.route");

const defaultRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
