const express = require("express");
const { busController } = require("../../controllers");
const {
  validateBusSearch,
} = require("../../middleware/Bus/searchBusValidation");
const router = express.Router();

router.get("/:id", busController.getBusById);
router.post("/search", validateBusSearch, busController.searchBus);
router.post("/book");
module.exports = router;
