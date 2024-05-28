const catchAsync = require("../../utils/catchAsync");
const OperatorModel = require("../../models/bus-operator.schema");

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

module.exports = {
  registerOperator,
};
