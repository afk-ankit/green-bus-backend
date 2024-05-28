const express = require("express");
const {
  validateOperatorRegistration,
  validateOperatorLogin,
  validateBusSchema,
} = require("../../middleware/Operator/operatorValidation");
const { operatorController } = require("../../controllers");
const { operatorAuth } = require("../../middleware/Operator/operatorAuth");
const router = express.Router();

router.post(
  "/register",
  validateOperatorRegistration,
  operatorController.registerOperator
);

router.post("/login", validateOperatorLogin, operatorController.loginOperator);

router.post(
  "/bus",
  operatorAuth,
  validateBusSchema,
  operatorController.createBus
);

module.exports = router;
