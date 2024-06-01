const z = require("zod");

const operatorRegisterSchema = z.object({
  coordinator_name: z.string().min(1),
  company_name: z.string().min(1),
  email: z.string().email(),
  token: z.string().min(1),
  address: z.string().min(1),
  contact_number: z.string().min(10),
  years_of_service: z.number().int().nonnegative(),
});

const operatorLoginSchema = z.object({
  token: z.string().min(1),
  company_name: z.string().min(1),
  email: z.string().min(1),
});

const busSchema = z
  .object({
    bus_no: z.string(),
    source: z.array(z.string()).nonempty(),
    destination: z.array(z.string()).nonempty(),
    fare: z.number(),
    departure_time: z.array(z.string()).nonempty(),
    arrival_time: z.array(z.string()).nonempty(),
    available_dates: z
      .array(
        z.object({
          date: z.string().min(1),
          booked_seats: z.array(z.number()),
        })
      )
      .nonempty(),
    distance: z.record(z.number()),
    bus_type: z.enum(["simple", "seater"]),
    total_seats: z.number(),
    staff: z
      .array(
        z.object({
          id: z.number(),
          name: z.string(),
          role: z.enum(["conductor", "driver"]),
          contact_number: z.string().min(10),
        })
      )
      .nonempty(),
    operator: z.string(),
  })
  .refine((data) => data.departure_time.length === data.source.length, {
    message: "Departure time array length must match source array length",
    path: ["departure_time"],
  })
  .refine((data) => data.arrival_time.length === data.destination.length, {
    message: "Arrival time array length must match destination array length",
    path: ["arrival_time"],
  })
  .refine(
    (data) =>
      Object.keys(data.distance).length ===
      data.source.length + data.destination.length,
    {
      message: "Distance must be provided for all source and destinations",
      path: ["distance"],
    }
  );

const validateOperatorRegistration = (req, res, next) => {
  const validationResult = operatorRegisterSchema.safeParse(req.body);
  if (!validationResult.success) {
    res.status(400).json({ errors: validationResult.error.flatten() });
  } else {
    next();
  }
};

const validateOperatorLogin = (req, res, next) => {
  const validationResult = operatorLoginSchema.safeParse(req.body);
  if (!validationResult.success) {
    res.status(400).json({ errors: validationResult.error.flatten() });
  } else {
    next();
  }
};

const validateBusSchema = (req, res, next) => {
  const validationResult = busSchema.safeParse(req.body);
  if (!validationResult.success) {
    res.status(400).json({ errors: validationResult.error.flatten() });
  } else {
    next();
  }
};

module.exports = {
  validateOperatorRegistration,
  validateOperatorLogin,
  validateBusSchema,
};
