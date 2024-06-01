const express = require("express");
const { verifyTokenController } = require("../../controllers");
const router = express.Router();

router.post("/", verifyTokenController.verifyToken);
module.exports = router;
