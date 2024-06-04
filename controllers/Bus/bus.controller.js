const BusModel = require("../../models/bus.schema");
const catchAsync = require("../../utils/catchAsync");
const { sendBookingConfirmationEmail } = require("../../utils/email");

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
  const { source, destination, date } = req.body;
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const nextDay = new Date(startOfDay);
  nextDay.setDate(startOfDay.getDate() + 1);

  const buses = await BusModel.find({
    source: { $in: [source] },
    destination: { $in: [destination] },
    available_dates: {
      $elemMatch: {
        date: {
          $gte: startOfDay,
          $lt: nextDay,
        },
      },
    },
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

const bookBus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { selected_seats, date, source, destination } = req.body;
  const { email } = req.user;

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const nextDay = new Date(startOfDay);
  nextDay.setDate(startOfDay.getDate() + 1);

  const bus = await BusModel.findOneAndUpdate(
    {
      _id: id,
      available_dates: {
        $elemMatch: {
          date: {
            $gte: startOfDay,
            $lt: nextDay,
          },
        },
      },
    },
    {
      $push: { "available_dates.$[].booked_seats": { $each: selected_seats } },
    },
    { new: true, runValidators: true }
  );

  if (!bus) {
    return res.status(404).send({
      message: "No bus found with this ID",
    });
  }
  const busDetails = `Bus ID: ${
    bus._id
  }, Source: ${source}, Destination: ${destination}, Date: ${date}, Seats: ${selected_seats.join(
    ", "
  )}`;

  // Send booking confirmation email
  await sendBookingConfirmationEmail(email, busDetails);

  res.status(200).json({
    status: "success",
    data: {
      bus,
    },
  });
});

module.exports = { searchBus, getBusById, bookBus };
