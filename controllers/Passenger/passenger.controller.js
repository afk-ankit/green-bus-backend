const catchAsync = require("../../utils/catchAsync");
const PassengerModel = require("../../models/passenger.schema");

const createPassenger = catchAsync(async (req, res) => {
  const { name, age, sex, contact_number } = req.body;
  const Passenger = new PassengerModel({
    name,
    age,
    sex,
    contact_number,
  });
  const passenger = await Passenger.save();
  return res
    .status(201)
    .send({ message: "Passenger created successfully", data: passenger });
});

const deletePassenger = catchAsync(async (req, res) => {
  const { id } = req.params;
  const passenger = await PassengerModel.findByIdAndDelete(id);
  if (!passenger) {
    return res.status(404).send("No passenger found with this id");
  }
  res.send({ message: "Passenger deleted successfully", data: passenger });
});

module.exports = {
  createPassenger,
  deletePassenger,
};
