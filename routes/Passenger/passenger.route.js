const express = require("express");
const { passengerController } = require("../../controllers");
const {
  validatePassenger,
} = require("../../middleware/Passenger/passengerValidation");
const { userAuth } = require("../../middleware/User/userAuth");
const router = express.Router();

router.post(
  "/",
  userAuth,
  validatePassenger,
  passengerController.createPassenger
);
router.delete("/:id", userAuth, passengerController.deletePassenger);

module.exports = router;
