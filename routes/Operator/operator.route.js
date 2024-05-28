const express = require("express");
const {
  validateOperator,
} = require("../../middleware/Operator/operatorValidation");
const { operatorController } = require("../../controllers");
const router = express.Router();

router.post("/", validateOperator, operatorController.registerOperator);
module.exports = router;
