const express = require("express");
const { busController } = require("../../controllers");
const {
  validateBusSearch,
  validateBusBooking,
} = require("../../middleware/Bus/busValidation");
const { userAuth } = require("../../middleware/User/userAuth");
const router = express.Router();

router.get("/allbuses/:id", busController.getBusByOperator);
router.get("/:id", busController.getBusById);
router.post("/search", validateBusSearch, busController.searchBus);
router.put("/book/:id", userAuth, validateBusBooking, busController.bookBus);
module.exports = router;
