const z = require("zod");
const searchBusSchema = z.object({
  source: z.string().min(1, "Source is required"),
  destination: z.string().min(1, "Destination is required"),
  date: z.string().min("date is required"),
  name:z.string()
});
const bookBus = z.object({
  source: z.string().min(1, "source required"),
  destination: z.string().min(1, "destination required"),
  selected_seats: z.array(z.number()).nonempty(),
  date: z.string().min(1, "Date is required"),
});

const validateBusSearch = (req, res, next) => {
  const validationResult = searchBusSchema.safeParse(req.body);
  if (!validationResult.success) {
    res.status(400).json({ errors: validationResult.error.flatten() });
  } else {
    next();
  }
};

const validateBusBooking = (req, res, next) => {
  const validationResult = bookBus.safeParse(req.body);
  if (!validationResult.success) {
    res.status(400).json({ errors: validationResult.error.flatten() });
  } else {
    next();
  }
};

module.exports = {
  validateBusSearch,
  validateBusBooking,
};
