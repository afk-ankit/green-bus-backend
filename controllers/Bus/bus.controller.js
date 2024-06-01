const BusModel = require("../../models/bus.schema");
const catchAsync = require("../../utils/catchAsync");

const getBusById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const bus = await BusModel.findById(id);
  if (!bus) {
    return res.status(404).send({
      message: "No bus found",
    });
  }
  res.send({
    data: {
      bus,
    },
  });
});

const searchBus = catchAsync(async (req, res) => {
  const { source, destination } = req.body;

  const buses = await BusModel.find({
    source: { $in: [source] },
    destination: { $in: [destination] },
  });

  if (buses.length == 0) {
    return res.status(404).send({
      message: "No buses found",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      buses,
    },
  });
});

module.exports = { searchBus, getBusById };
