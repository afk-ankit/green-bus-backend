const catchAsync = require("../../utils/catchAsync");
const OperatorModel = require("../../models/bus-operator.schema");
const { encodeJwt } = require("../../utils/jwtUtils");
const BusModel = require("../../models/bus.schema");

const registerOperator = catchAsync(async (req, res) => {
  const { email } = req.body;
  const existingOperator = await OperatorModel.findOne({ email });
  if (existingOperator) {
    return res.status(400).send("Operator is already registered");
  }
  const Operator = new OperatorModel(req.body);
  const operator = await Operator.save();
  res.status(201).send(operator);
});

const loginOperator = catchAsync(async (req, res) => {
  const { token, company_name, email } = req.body;
  const operator = await OperatorModel.findOne({ email });
  if (!operator) {
    return res.status(400).send("No operator found with this email.");
  }

  if (operator.token !== token) {
    return res.status(400).send("Invalid token.");
  }
  const jwtToken = encodeJwt({ token, company_name, email });
  res.send({ message: "Logged in successfully.", token: jwtToken });
});

const createBus = catchAsync(async (req, res) => {
  const Bus = new BusModel(req.body);
  const bus = await Bus.save();
  res.status(201).send({
    message: "successfully created bus",
    data: bus,
  });
});

module.exports = {
  registerOperator,
  loginOperator,
  createBus,
};
